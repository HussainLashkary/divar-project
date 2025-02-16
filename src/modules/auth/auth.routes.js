const {Router} = require("express");
const authController = require("./auth.controller");
const Authorization = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post('/check-otp', authController.checkOTP);
router.get("/logout", Authorization, authController.logout)
router.get("/loginPage", authController.loginPage)
router.post("/loginPage", authController.login)
router.get("/verify-otp", authController.checkOTPEjs)
router.post("/verify-otp", authController.verifyOtp)

module.exports = {
    AuthRouter: router
}