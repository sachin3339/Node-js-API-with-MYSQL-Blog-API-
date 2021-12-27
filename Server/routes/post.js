const express = require('express');
const postcontroller = require('../controller/post.controller');
const router = express.Router();

router.post("/",postcontroller.save);
router.get("/",postcontroller.all);
router.get("/:id",postcontroller.show);
router.patch("/:id",postcontroller.update);
router.delete("/:id",postcontroller.destroy);

module.exports=router;