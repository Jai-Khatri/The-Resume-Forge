import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js'; 
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const { logout } = useAuthStore(); // Destructure the logout function from authStore
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Handle user logout
  const handleLogout = () => {
    logout(); // Call the logout function
    toast.success("Successfully logged out!"); // Show success notification
  };

  // Navigate to the resumes page
  const handleNavigateToResumes = () => {
    navigate('/resumes'); // Navigate to the /resumes route
    setIsOpen(false); // Close the mobile menu after navigation
  };

  // Navigate to the home page
  const handleNavigateToHome = () => {
    navigate('/'); // Navigate to the home route
    setIsOpen(false); // Close the mobile menu after navigation
  };

  return (
    <div className="bg-transparent-black p-8 shadow-lg">
      {/* Navbar container */}
      <div className="flex items-center justify-between">
        
        {/* Logo/Heading */}
        <div>
          <h1 className="text-white text-3xl font-bold">The Resume Forge</h1>
          <span className="text-white text-sm italic">Where Careers Are Crafted, Not Just Written!</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu visibility
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? '✖️' : '☰'} {/* Show 'X' when open, '☰' when closed */}
        </button>

        {/* Navigation Menu for Large Screens */}
        <nav className="hidden md:flex md:space-x-12">
          <ul className="flex items-center space-x-8">
            <li 
              className="text-white text-lg hover:text-gray-300 hover:scale-110 transition duration-200 cursor-pointer"
              onClick={handleNavigateToHome} // Navigate to home on click
            >
              Home
            </li>
            <li 
              onClick={handleNavigateToResumes} // Navigate to resumes on click
              className="text-white text-lg hover:text-gray-300 hover:scale-110 transition duration-200 cursor-pointer"
            >
              Resumes
            </li>
            <li 
              onClick={handleLogout} // Logout on click
              className="text-white text-lg hover:text-gray-300 hover:scale-110 transition duration-200 cursor-pointer"
            >
              Log out
            </li>
          </ul>
        </nav>
      </div>

      {/* Navigation Menu for Small Screens */}
      {isOpen && ( // Render mobile menu if isOpen is true
        <nav className="block md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            <li 
              className="text-white text-lg hover:text-gray-300 transition duration-200 cursor-pointer"
              onClick={handleNavigateToHome} // Navigate to home on click
            >
              Home
            </li>
            <li 
              onClick={handleNavigateToResumes} // Navigate to resumes on click
              className="text-white text-lg hover:text-gray-300 transition duration-200 cursor-pointer"
            >
              Resumes
            </li>
            <li 
              onClick={handleLogout} // Logout on click
              className="text-white text-lg hover:text-gray-300 transition duration-200 cursor-pointer"
            >
              Log out
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
