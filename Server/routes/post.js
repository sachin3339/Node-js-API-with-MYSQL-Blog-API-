const express = require('express');
const postcontroller = require('../controller/post.controller');
const checkAuthMiddleware= require('../middleware/check-auth');

const router = express.Router();

router.post("/",checkAuthMiddleware.checkAuth,postcontroller.save);
router.get("/",postcontroller.all);
router.get("/:id",postcontroller.show);
router.patch("/:id",checkAuthMiddleware.checkAuth,postcontroller.update);
router.delete("/:id",checkAuthMiddleware.checkAuth,postcontroller.destroy);

module.exports=router;