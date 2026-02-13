const router = require("express").Router();
const authController = require("../controllers/authController");
const {body} = require("express-validator");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password")
          .isLength({min: 6})
          .withMessage("password must be at least 6 characters")
    ], 
    authController.register);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;