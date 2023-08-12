const asyncHandler = require("express-async-handler");
const User = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async(req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
        ...req.body,
        password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        console.log(err)
    }
});


const login = asyncHandler(async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json("username not Found!")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json("Worng Password!");
        }
        // jwt token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRETE_KEY, { expiresIn: "7d" });
        const { password, isAdmin, ...othersDetails } = user._doc;
        res
            .cookie("access_token", token, { httpOnly: true, })
            .status(200).json({ ...othersDetails });
    } catch(err){
        console.log(err)
    }
});

module.exports = { register ,login};
