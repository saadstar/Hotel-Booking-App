const asynchandler=require("express-async-handler");
const Hotel = require("../models/Hotels");
const Room = require("../models/Room");


// @GET 
// @desc: get All Hotels 
const getAllHotels = asynchandler(async (req, res,next) => {    
    try{
        const hotels = await Hotel.find(req.query).limit(req.query.limit);
        res.json(hotels);
    } catch (err){
        next(err)
    }
});

// @POSt
const addHotel = asynchandler(async (req, res,next) => {
    const newHotel = new Hotel(req.body);
    try{
      const savedHotel=  await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
});

// @PUt 
const editHotel = asynchandler(async(req, res,next) => {
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err)
    }
});

// @DELETE 
const deleteHotel = asynchandler(async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted successfully");
  } catch (err) {
    next(err);
  }
});

// @GET 
// @desc: get only one hotel by id 
const getHotel = asynchandler(async (req, res,next) => {
    try{
        const hotelById= await Hotel.findById(req.params.id);
        res.status(200).json(hotelById);
    } catch (err) {
        next(err);
    }
});

const countbycity = asynchandler(async (req, res,next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }))
        res.status(200).json(list);
    }catch(err){
        console.log(err)
    }
})
const countbytype = asynchandler(async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabineCount = await Hotel.countDocuments({ type: "cabine" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabines", count: cabineCount },
    ]);
  } catch (err) {
    console.log(err);
  }
});

const getHotelRooms = asynchandler(async (req,res,next) => {
  try{
    const hotel = await Hotel.findById( req.params.id);
    const list = await Promise.all(hotel.rooms.map((room) => {
      return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (err) {
    res.status(401).json("Error in geting rooms from hotel")
  }
}) 

module.exports = {
  getAllHotels,
  addHotel,
  deleteHotel,
  editHotel,
  getHotel,
  countbycity,
  countbytype,
  getHotelRooms,
};