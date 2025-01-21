const {Router} = require("express");
const UserController = require("./user.controller");
const router = Router();
const Authorization = require("./../../common/guard/authorization.guard")
router.get("/whoami", Authorization, UserController.whoami);
module.exports = {
    UserRouter: router
}