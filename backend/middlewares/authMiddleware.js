const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, req, next) => {
  try {
    const token = req.header.authorization;
    if (!token) {
      res.status(403).json({
        success: false,
        message: "Unauthorized, JWT token expired",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.error("Auth error", error);
    return res.status(403).send({
      message: "Unauthorized, JWT token invalid or expired",
    });
  }
};

module.exports = { isAuthenticated };
