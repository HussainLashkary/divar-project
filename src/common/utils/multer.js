const multer  = require('multer')
const fs = require("fs")
const path = require('path')
const createHttpError = require('http-errors')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(path.join(process.cwd(), "public", "uploads"), {recursive: true})
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        const whiteListFormat = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (whiteListFormat.includes(file.mimetype)){
            const format = path.extname(file.originalname);
            const filename = new Date().getTime().toString() + format // can use uuid package
            cb(null, filename);
        } else {
            cb(new createHttpError.BadRequest("format of pictures are wrong"))
        }
    }
})
const upload = multer({
    storage,
    limits: {fieldSize: 1024 * 1024 * 4},
})
module.exports = {
    upload
}