const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.get("/", (req, res) => {
  res.send({ msg: "Todo Home Page" });
});

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.send({ msg: "User already has exist, Please try to login" });
  } else {
    bcrypt.hash(password, 5, async (err, hash_password) => {
      if (err) {
        res.send({ msg: "Something Went is wrong" });
      } else {
        const new_user = new userModel({
          name: name,
          email: email,
          password: hash_password,
        });

        await new_user.save();

        res.send({ msg: "Signup Successfull ho gaya hahahah" });
      }
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;

  bcrypt.compare(password, hashed_password, async (err, result) => {
    if (result) {
      const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY);
      res.send({ msg: "Login successfull", token: token });
    } else {
      res.send({ msg: "Login Faild" });
    }
  });
});

module.exports = {
  userRouter,
};
