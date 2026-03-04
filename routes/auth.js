var express = require("express");
var Router = express.Router;
// const User = require("../models/User.js")
var User = require("../models/User.js");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    console.log("Register request:", req.body);

    const user = new User(req.body);
    const savedUser = await user.save();

    console.log("Saved user:", savedUser);

    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDB = await User.findOne({ email });

  // check if user exists
  if (!userDB) {
    return res.status(404).json({ message: "User not found" });
  }

  if (userDB.password === password) {
    res.json(userDB);
  } else {
    res.status(401).json({ message: "Invalid Password" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email, newPassword, otp } = req.body;

  // get user from DB
  const userDB = await User.findOne({ email });

  // check if user exists
  if (!userDB) {
    return res.json({ message: "User not found" });
  }

  // check OTP
  if (otp === "1234") {
    userDB.password = newPassword;
    await userDB.save();
    res.json({ message: "User data updated" });
  } else {
    res.json({ message: "Invalid OTP" });
  }
});

router.post("/check-user", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.json({ message: "User exists" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
