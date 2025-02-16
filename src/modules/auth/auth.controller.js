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
            if (mobile) {
                await this.#service.sendOTP(mobile);
            }
        } catch (error) {
            next(error)
        }
    }
    async loginPage(req, res, next) {
        try {
            res.render("./pages/auth/loginPage.ejs", {layout: 'layouts/auth/main.ejs'});
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            let { mobile } = req.body;
            let otp = null;
            if (mobile) {
                if(mobile.startsWith("0098")) {
                    mobile = '0' + mobile.slice(4);
                }
                otp = await this.#service.getOTP(mobile)
            }
            otp = otp.code;
            console.log(otp)
            res.redirect(`/auth/verify-otp?mobile=${(mobile)}&otp=${(otp)}`);
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
    async checkOTPEjs(req, res, next) {
        try {
            const {mobile, otp} = req.params
            res.render("./pages/auth/check-otp.ejs", {mobile, otp, layout: 'layouts/auth/main.ejs'})
        } catch (error) {
            next(error)
        }
    }
    async verifyOtp(req, res, next) {
        try {
            const { otp, mobile } = req.body;
            console.log(mobile)
            const token = await this.#service.checkOTP(otp, mobile);
            res.cookie(CookieNames.accessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.production
            });
            // If OTP verification is successful, redirect to the desired route
            res.redirect('/post/my'); // Redirect to the desired route
        } catch (error) {
            // If OTP verification fails, render the EJS page with the failure message
            res.render('./pages/auth/loginPage.ejs', {
                message: 'Failed to verify OTP. Please try again.'
            });
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
