const jwt =  require("jsonwebtoken");

const generateToken= (id) => {
    return jwt.sign({ id }, Process.env.JWT_SECRET,{
        expiresIn: "1h"
    });
};

MediaSourceHandle.exports = generateToken;