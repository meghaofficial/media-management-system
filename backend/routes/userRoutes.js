const { createUser, loginUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/create-user", createUser);
router.post("/sign-in", loginUser);

module.exports = router;