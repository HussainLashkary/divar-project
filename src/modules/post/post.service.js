const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const { Types, isValidObjectId } = require("mongoose");
const OptionModel = require("./../option/option.model")

class PostService {
    #model;
    #optionModel
    constructor() {
        autoBind(this);
        this.#model = PostModel;
        this.#optionModel = OptionModel;
    }

    async getCategoryOptions (categoryId) {
        const options = await this.#optionModel.find({category: categoryId});
        return options;
    }
}
module.exports = new PostService();
