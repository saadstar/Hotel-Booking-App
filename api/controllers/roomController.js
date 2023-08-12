const asynchandler = require("express-async-handler");
const Room = require("../models/Room");
const Hotel = require("../models/Hotels");

// @POST
const createRoom = asynchandler(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    } catch (err) {
      console.log(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    console.log(err);
  }
});

// @PUt
const updateRoom = asynchandler(async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    console.log(err);
  }
});

// @DELETE
const deleteRoom = asynchandler(async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

// @GETALL
const getAllRooms = asynchandler(async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.log(err);
  }
});

// @GET by id
const getRoom = asynchandler(async (req, res) => {
  try {
    const roomById = await Room.findById(req.params.id);
    res.status(200).json(roomById);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { getRoom, getAllRooms, deleteRoom, updateRoom, createRoom };
