const asynchandler = require("express-async-handler");
const User = require("../models/Auth");

// @GET
// @desc: get All Users
const getAllUsers = asynchandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});


// @PUt
const editUser = asynchandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

// @DELETE
const deleteUser = asynchandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

// @GET
// @desc: get only one hotel by id
const getUser = asynchandler(async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    res.status(200).json(userById);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { getAllUsers, deleteUser, editUser, getUser };
