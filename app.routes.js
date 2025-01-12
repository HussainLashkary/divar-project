const { Router } = require('express');
const { AuthRouter } = require("./src/modules/auth/auth.routes")
const mainRouter = Router();

mainRouter.use("/auth", AuthRouter)

module.exports = mainRouter;