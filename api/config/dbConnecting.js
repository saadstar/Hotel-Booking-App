const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("connected to database");
  } catch (err) {
    console.log("error in connecting to database");
  }
};
module.exports = connectDB;