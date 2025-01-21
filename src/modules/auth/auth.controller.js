    const autoBind = require("auto-bind")
    const authService = require('./auth.service');
    const authMessage = require('./auth.message');
    const NodeEnv = require("../../common/constant/env.enum");
    const CookieNames = require("./../../common/constant/cookie.enum")

class AuthController {
    #service;
    constructor(){
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: authMessage.sendOtpSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res.cookie(CookieNames.accessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.production
            }).status(200).json({
                message: authMessage.LoginSuccessfully,
            })
        } catch (error) {
            next(error)
        }
     }
     async logout(req, res, next) {
        try {
            return res.clearCookie(CookieNames.accessToken).status(200).json({
                message: authMessage.LogoutSuccessfully
            })
        } catch (error) {
            next(error)
        }
     }
}
module.exports = new AuthController(); 
