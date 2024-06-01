const express = require("express");
const router = express.Router();


const {
    sendOtp,
    signup, 
    login,
} = require("../controllers/Auth");



const {auth} = require("../middlewares/auth");


router.post("/sendOtp", sendOtp);

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;