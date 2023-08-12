const express=require("express");
const router=express.Router();
const {
  getAllHotels,
  addHotel,
  deleteHotel,
  editHotel,
  getHotel,
  countbycity,
  countbytype,
  getHotelRooms,
} = require("../controllers/hotelController");
// get all 
router.get("/",getAllHotels);
// post
router.post("/",addHotel);
// edit by id 
router.put("/:id", editHotel);
// delete by id
router.delete("/:id",deleteHotel);
// get by id 
router.get("/find/:id", getHotel);

router.get("/countbycity",countbycity);
router.get("/countbytype",countbytype);
router.get("/room/:id", getHotelRooms);
module.exports = router;
