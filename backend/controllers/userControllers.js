const asyncHandler = require("express-async-handler");
const express = require("express");
const { create } = require("../models/userModels");
const User = require("../models/userModels");
const { generateToken } = require("../utils/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, pass, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404).json(0);
  }

  const user = await User.create({
    name,
    email,
    pass,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, pass } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(pass))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json(0);
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
  // res.send("yeeeeeeeeep");
});

module.exports = { registerUser, authUser, updateUserProfile };
