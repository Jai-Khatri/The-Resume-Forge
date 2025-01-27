import express from 'express'; // Express framework for building web applications
import dotenv from 'dotenv'; // Module to load environment variables from a .env file
import cors from 'cors'; // Middleware for enabling CORS (Cross-Origin Resource Sharing)
import userRoutes from './routes/user.routes.js'; // Import user-related routes
import resumeRoutes from './routes/resume.routes.js'; // Import resume-related routes
import { ConnectToDB } from './libs/db.js'; // Function to connect to the database
import path from 'path'; // Module for handling and transforming file paths

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express(); 

// Retrieve the port number from environment variables
const PORT = process.env.PORT; 

// Resolve the current directory path
const __dirname = path.resolve();

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests

// Enable CORS for all routes, allowing requests from specified origin with credentials
app.use(cors({origin: "http://localhost:5173" , credentials: true}));

// Set up API routes for user and resume functionalities
app.use("/api", userRoutes);
app.use("/api", resumeRoutes); t


// Check if the application is running in production mode

if(process.env.NODE_ENV === "production"){
    
    // Serve static files from the specified directory in production
    app.use(express.static(path.join(__dirname, "../frontend/the-resume-forge/dist")));

    // Handle all GET requests that do not match any other route by serving index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/the-resume-forge", "dist", "index.html"));
    });
}

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log("Server listening on PORT:- ", PORT); // Log server start message with port number
    ConnectToDB(); // Call function to connect to the database
});
