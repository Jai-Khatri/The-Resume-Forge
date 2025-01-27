import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Utility function for error handling
const handleErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

// Controller to create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return handleErrorResponse(res, 400, "Invalid credentials!!!");
        }

        // Check if user already exists
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return handleErrorResponse(res, 400, "User already exists!!");
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.log("Error in createUser controller!!! ", error.message);
        return handleErrorResponse(res, 500, "Server Error!!");
    }
};

// Controller to retrieve a user by email and password
export const getUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return handleErrorResponse(res, 400, "Credentials required!!!");
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return handleErrorResponse(res, 400, "Invalid credentials!!!");
        }

        // Compare passwords
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (correctPassword) {
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
            return res.status(200).json({ user, token });
        } else {
            return handleErrorResponse(res, 400, "Invalid credentials!!!");
        }
    } catch (error) {
        console.log("Error in getUser controller!!! ", error.message);
        return handleErrorResponse(res, 500, "Internal server error!!");
    }
};
