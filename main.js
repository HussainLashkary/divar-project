const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./app.routes');
const NotFoundHandler = require('./src/common/not-found.handler');
const AllExceptionHandler = require('./src/common/all-exception.handler');
const cookieParser = require("cookie-parser")
const EventEmitter = require('events');
const crypto = require("crypto")
dotenv.config();

async function main() {
    const app = express();
    const port = process.env.PORT;
    const myEmitter = new EventEmitter();
    myEmitter.setMaxListeners(20);
    require('./src/config/mongoose.config');
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(mainRouter)
    swaggerConfig(app)
    NotFoundHandler(app)
    AllExceptionHandler(app)
    app.listen(3000, () => {
        console.log(`serve on http://localhost:${port}`);
    })
}

main();