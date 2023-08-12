const express=require("express");
const router=express.Router();
const { getRoom, getAllRooms, deleteRoom, updateRoom, createRoom }=require("../controllers/roomController")
// get all 
router.get("/", getAllRooms);
// post
router.post("/:hotelid", createRoom);
// delete by id
router.delete("/:id",deleteRoom);
// edit by id 
router.put("/:id", updateRoom);
// get by id 
router.get("/:id",getRoom);
module.exports = router;
