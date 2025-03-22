const express = require('express');
const router = express.Router();
const authCon = require("../controller/authCon")


router.route("/login").get(authCon.login);


module.exports=router;