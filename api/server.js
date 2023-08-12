const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnecting");
const hotelrouter=require("./routes/hotels");
const authRouter=require("./routes/auth");
const userRouter=require("./routes/users");
const roomsRouter=require("./routes/rooms");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 3500 || process.env.PORT;

app.use(express.json());
connectDB();
// app.use(cookieParser());
app.use(cookieParser());
app.use(cors());
app.use("/api/hotels",hotelrouter);
app.use("/api/rooms",roomsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMsg,
        stack:err.stack
    });
    next();
});

app.listen(PORT,() =>{
    console.log(`connected to server on ${PORT}`);
});