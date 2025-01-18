    const autoBind = require("auto-bind")
    const authService = require('./auth.service');
    const authMessage = require('./auth.message');

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
            console.log(mobile, code)
            const token = await this.#service.checkOTP(mobile, code);
            return res.json({
                message: authMessage.LoginSuccessfully,
                token
            })
        } catch (error) {
            next(error)
        }
     }
}
module.exports = new AuthController(); 
