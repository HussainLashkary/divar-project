const autoBind = require("auto-bind");
const PostService = require("./post.service");
const CategoryModel = require("./../category/category.model");
const HttpCodes = require("http-status-codes");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");

class PostController {
    #service
    constructor() {
        autoBind(this);
        this.#service = PostService;
    }
    async createPostPage(req, res, next) {
        try {
            let slug = req.query.slug; 
            let showBack = false;
            let options;
            let match = { parent: null };
            if (slug) {
                slug = slug.trim();
                const category = await CategoryModel.findOne({ slug });
                if (!category) throw createHttpError.NotFound(PostMessage.NotFound);
                options = await this.#service.getCategoryOptions(category._id);
                if(options.length === 0) options = null;
                showBack = true;
                match = {
                    parent: category._id
                };
            }
            const categories = await CategoryModel.aggregate([
                {
                    $match: match
                }
            ]);
            res.render("./pages/panel/create-post.ejs", {
                categories,
                showBack,
                options
            });
        } catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            // Implementation for removing a post
        } catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            // Implementation for finding a post
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();
