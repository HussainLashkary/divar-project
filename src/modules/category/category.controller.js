const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const HttpCodes = require("http-status-codes");
const { CategoryMessage } = require("./category.messages");

class CategoryController {
    #service
    constructor() {
        autoBind(this);
        this.#service = categoryService
    }
    async create(req, res, next) {
        try {
            const { name, icon, slug, parent } = req.body;
            await this.#service.create({ name, icon, slug, parent });
            return res.status(HttpCodes.StatusCodes.CREATED).json({
                message: CategoryMessage.Created
            });
        } catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            await this.#service.remove(id)
            return res.json({
                message: CategoryMessage.Removed
            })
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
