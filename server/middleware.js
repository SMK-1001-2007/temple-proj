import pool from "./db.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        // Extracts the token attached in header 
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        if (!token)
            return res.status(401).json({ message: "Unauthorized, token missing" });

        // Verifies the token and decodes userId from it
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const result = await pool.query(
            "SELECT * FROM users where id = $1", [decoded.id]
        );

        // Attaches user details to the req for further ops
        req.user = result.rows[0];
        next();

    }
    catch(error) {
        if (error.name === "JsonWebTokenError")
            return res.status(401).json({ message: "Invalid token" });
        else if (error.name === "TokenExpiredError")
            return res.status(401).json({ message: "Token expired" });
        
        return res.status(401).json({ message: "Authorization failed" });
    }
}

