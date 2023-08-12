const express = require("express");
const router = express.Router();
const{ getAllUsers, deleteUser, editUser, getUser } = require("../controllers/userController");
// get all
router.get("/", getAllUsers);
// edit by id
router.put("/:id", editUser);
// delete by id
router.delete("/:id", deleteUser);
// get by id
router.get("/:id", getUser);
module.exports = router;
