const express = require('express');
const postcontroller = require('../controller/post.controller');
const router = express.Router();

router.post("/",postcontroller.save);
router.get("/",postcontroller.all);
router.get("/:id",postcontroller.show);

module.exports=router;