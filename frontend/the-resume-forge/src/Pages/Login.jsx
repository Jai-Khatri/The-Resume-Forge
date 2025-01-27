import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Link for navigation and Navigate for redirection
import { useAuthStore } from '../store/useAuthStore.js'; 
import toast from 'react-hot-toast'; 

const Login = () => {
  const [email, setEmail] = useState(''); // State to hold the email input
  const [password, setPassword] = useState(''); // State to hold the password input
  const [redirect, setRedirect] = useState(false); // State to manage redirection after successful login
  const { login, isLoggingIn, error } = useAuthStore(); // Destructure login function and state from authStore

  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault(); // Prevent default form submission behavior
    
    const success = await login({ email, password }); // Attempt to log in with email and password

    if (success) {
      setRedirect(true); // Set redirect state to true on successful login
      toast.success("Successfully logged in!!"); // Show success notification
      console.log("Login successful!"); // Log success message to console
    } else {
      toast.error(error || "Invalid credentials!"); // Show error notification if login fails
      console.error("Login failed:", error); // Log error to console
    }
  };

  // Redirect to home page if redirect state is true
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#24243e]">
      <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit}> {/* Form for user login */}
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email} // Bind input value to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
              required // Mark input as required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password} // Bind input value to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="••••••••" 
              required // Mark input as required
            />
          </div>
          <button
            type="submit" // Submit button to trigger form submission
            disabled={isLoggingIn} // Disable button while logging in
            className={`w-full ${isLoggingIn ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200 text-white font-semibold py-2 rounded mt-4`}
          >
            {isLoggingIn ? 'Logging In...' : 'Log In'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message if exists */}
        </form>
        <p className="text-center text-white text-sm mt-4">
          Don't have an account? 
          <Link to="/signup" className='text-blue-600 hover:underline ml-1'>Sign up</Link> {/* Link to signup page */}
        </p>
      </div>
    </div>
  );
};

export default Login; 
