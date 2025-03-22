const express = require('express');
const router = express.Router();
const authCon = require("../controller/authCon")


router.route("/login").get(authCon.login);
router.route("/register").post(authCon.register);

module.exports=router;