import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirection
import { useAuthStore } from '../store/useAuthStore.js'; 
import toast from 'react-hot-toast'; 

const Signup = () => {
  
  // Initialize formData state to hold user input for signup
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const { signup, isSigningUp, error } = useAuthStore(); // Destructure signup function and state from authStore
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Get name and value from the input event
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in formData
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const signupCheck = await signup(formData); // Attempt to sign up with the form data

    if (signupCheck) {
      navigate('/login'); // Redirect to login page on successful signup
      toast.success("Account Registered!"); // Show success notification
    } else {
      toast.error(error); // Show error notification if signup fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#24243e]">
      <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}> {/* Form for user signup */}
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name" // Bind input name to state
              value={formData.name} // Bind input value to name in formData
              onChange={handleChange} // Update state on input change
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              required // Mark input as required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email" // Bind input name to state
              value={formData.email} // Bind input value to email in formData
              onChange={handleChange} // Update state on input change
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
              name="password" // Bind input name to state
              value={formData.password} // Bind input value to password in formData
              onChange={handleChange} // Update state on input change
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="••••••"
              required // Mark input as required
            />
          </div>
          <button
            type="submit" // Submit button to trigger form submission
            disabled={isSigningUp} // Disable button while signing up
            className={`w-full transition duration-300 ease-in-out text-white font-semibold py-2 rounded mt-4 ${isSigningUp ? 'bg-gray-600 opacity-75' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSigningUp ? 'Signing Up...' : 'Sign Up'} {/* Button text changes based on loading state */}
          </button>
        </form>
        <p className="text-center text-white text-sm mt-4">
          Already have an account? 
          <Link to="/login" className='text-blue-600 hover:underline ml-1'>Log in</Link> {/* Link to login page */}
        </p>
      </div>
    </div>
  );
};

export default Signup; 
