const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOtp");
const logActivity = require("../utils/logger");
const { validationResult } = require("express-validator");

exports.register = async(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({error: error.array()});
    
    const {email, password }= req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        err => {
            if (err) return res.status(500).json(err);
            res.json({message: "User registered sucessfully"});
        }
    );
};


exports.sendOtp = (req, res) =>{
    const { email } = req.body;

    const otp = generateOTP();

    db.query(
        "UPDATE users SET otp=? WHERE email=?",
        [otp, email],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({
                message: "OTP generated",
                otp: otp
            });
        }
    );
};



exports.verifyOtp = (req, res) => {
    const {email, otp} = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ? AND otp = ? ",
        [email, otp],
        (err, result) =>{
            if (result.length === 0)
                return res.status(400).json({message:"Invalid OTP"});

            const user = result[0];

            const token =jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET,
                { expiresIn: "1h"}
            );

            logActivity(user.id, "User logged in with OTP");
            res.json({ token });
        }
    );
};

