const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=> {
    const token= req.headers["authorization"];

    if(!token) return res.status(401).json({ message: "No token"});
        try{
            const actualToken = token.startswith("Bearer")
              ? token.split(" ")[1]
              : token;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch {
            res.status(401).json({message: "Invalid token" });
        }
    };