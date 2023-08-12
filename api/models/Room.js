const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const RoomSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    maxPeople: {
        type: Number,
        required:true
    },
    desc: {
        type: String,
        required:true
    },
    roomNumbers: {
        type: [{number:Number,unavalibaleDates:{type:[Date]}}],
        
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Room", RoomSchema);