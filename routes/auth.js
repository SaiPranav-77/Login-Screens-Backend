var express = require("express");
var Router = express.Router;
// const User = require("../models/User.js")
var User = require("../models/User.js");

const router = Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json("User Saved in DB");
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const userDB = await User.findOne({ email });
  const userDBPassword = userDB.password;
  if (userDBPassword === password) {
    res.json(userDB);
  } else {
    res.json({ message: "Invalid Password" });
  }
  res.json("logged in");
});

// router.post("/forgot-password", async (req, res) => {
//   //get the data from postman
//   const user = req.body;
//   const email = user.email;
//   const newPassword = user.newPassword;
//   const otp = user.otp;

//   //get the data from db
//   let userDB = await User.findOne({ email });

//   if (otp === "1234") {
//     userDB.password = newPassword;
//     await userDB.save();
//     res.json({ message: "User data updated" });
//   } else {
//     res.json({ message: "Invalid OTP" });
//   }
// });

router.post("/forgot-password", async (req, res) => {
//   console.log("forgot-password");  res.json("forgot-password");
const user = req.body;
  const email = user.email;
  const newPassword = user.newPassword;
  const otp = user.otp;

  //get the data from db
  let userDB = await User.findOne({ email });

  if (otp === "1234") {
    userDB.password = newPassword;
    await userDB.save();
    res.json({ message: "User data updated" });
  } else {
    res.json({ message: "Invalid OTP" });
  }
});

module.exports = router;
