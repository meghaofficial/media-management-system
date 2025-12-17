const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });

    const existsUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existsUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPwd,
    });

    res.status(201).json({
      success: true,
      message: "Sign up successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    //      Jwt has 3 parts = HEADER.PAYLOAD.SIGNATURE
    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token: jwtToken
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createUser, loginUser };
