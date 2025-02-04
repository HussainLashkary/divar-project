const { Router } = require('express');
const { AuthRouter } = require("./src/modules/auth/auth.routes");
const { UserRouter } = require('./src/modules/user/user.routes');
const { CategoryRouter } = require('./src/modules/category/category.routes');
const { OptionRoutes } = require("./src/modules/option/option.routes");
const { PostRouter } = require('./src/modules/post/post.routes');
const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);
mainRouter.use("/option", OptionRoutes);
mainRouter.use("/post", PostRouter);
mainRouter.get("/", (req, res) => {
    res.locals.layout = "./layouts/website/main.ejs";
    res.render("./pages/home/index.ejs");
});
mainRouter.get("/panel", (req, res) => {
    res.render("./pages/panel/dashboard.ejs")
});
mainRouter.get("/auth/login", (req, res) => {
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/login.ejs")
});


module.exports = mainRouter;