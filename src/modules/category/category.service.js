const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.messages");
const { Types, isValidObjectId } = require("mongoose");
const { default: slugify } = require("slugify");

class CategoryService {
    #model
    constructor() {
        autoBind(this);
        this.#model = CategoryModel
    }
    async find() {
        return await this.#model.find({ parent: { $exists: false } })
    }
    async create(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existCategory._id; // Ensure this is an ObjectId
            categoryDto.parents = [
                ...new Set(
                    ([existCategory._id.toString()].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ];
        } else if (categoryDto?.parent) {
            // Convert to ObjectId if it's a string
            categoryDto.parent = Types.ObjectId(categoryDto.parent);
        }
        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.name);
            await this.alreadyExistBySlug(categoryDto.slug);
        } else {
            categoryDto.slug = slugify(categoryDto.name);
        }
        const category = await this.#model.create(categoryDto);
        return category;
    }
    async checkExistById(id) {
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category
    }
    async checkExistBySlug(slug) {
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category
    }
    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({ slug: slug });
        if (category) throw new createHttpError.Conflict(CategoryMessage.alreadyExist);
        return category;
    }
}
module.exports = new CategoryService();
