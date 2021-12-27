const express = require('express');
const usercontroller = require('../controller/user.controller');
const router = express.Router();

router.post("/signup",usercontroller.signup);
router.post("/login",usercontroller.login);

module.exports = router;