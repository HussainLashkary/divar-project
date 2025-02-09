const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./src/app.routes');
const NotFoundHandler = require('./src/common/exceptions/not-found.handler');
const AllExceptionHandler = require('./src/common/exceptions/all-exception.handler');
const cookieParser = require("cookie-parser")
const expressEjsLayouts = require('express-ejs-layouts');
const moment = require('jalali-moment');
const methodOverride = require("method-override")
dotenv.config();

async function main() {
    const app = express();
    const port = process.env.PORT;
    require('./src/config/mongoose.config');
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(methodOverride('_method'))
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(express.static("public"));
    app.use(expressEjsLayouts)
    app.set("view engine", "ejs")
    app.set("layout", "./layouts/panel/main.ejs")
    app.set("layout extractScripts", true);
    app.set("layout extractStyle", true);
    app.locals.moment = moment;
    app.use(mainRouter)
    swaggerConfig(app)
    NotFoundHandler(app)
    AllExceptionHandler(app)
    app.listen(3000, () => {
        console.log(`serve on http://localhost:${port}`);
    })
}
main();