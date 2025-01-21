const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const HttpCodes = require("http-status-codes");
const { CategoryMessage } = require("./category.messages");
const { Types } = require("mongoose");

class CategoryController {
    #service
    constructor() {
        autoBind(this);
        this.#service = categoryService
    }
    async create(req, res, next) {
        try {
            const { name, slug, icon, parent } = req.body;
            await this.#service.create({ name, slug, icon, parent });
            return res.status(HttpCodes.StatusCodes.CREATED).json({
                message: CategoryMessage.Created
            });
        } catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const categories = await this.#service.find();
            return res.status(HttpCodes.StatusCodes.OK).json(categories);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
