import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

// Middleware function to authenticate JWT tokens
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from authorization header

    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ message: "Authorization token is required." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};
