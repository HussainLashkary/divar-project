const { Router } = require('express');
const { AuthRouter } = require("./src/modules/auth/auth.routes");
const { UserRouter } = require('./src/modules/user/user.routes');
const { CategoryRouter } = require('./src/modules/category/category.routes');
const mainRouter = Router();

mainRouter.use("/auth", AuthRouter)
mainRouter.use("/user", UserRouter)
mainRouter.use("/category", CategoryRouter)

module.exports = mainRouter;