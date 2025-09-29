import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Password Storing
export const hashPassword = async (password) => {
    try {
        // Salt is the random string added to password before hashing
        // The number represents the number of time hashing is done, more number => more secure
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error hashing password:", error);
    }
};

export const comparePassword = async (password, hashed) => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (error) {
        console.error("Error comparing password:", error);
    }
};

// Token Generation
export const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" } 
    );
};