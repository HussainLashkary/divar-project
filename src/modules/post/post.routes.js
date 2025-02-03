const { Router } = require("express");
const postController = require("./post.controller");

const router = Router();
router.get("/create", postController.createPostPage)
module.exports = {
    PostRouter: router
}