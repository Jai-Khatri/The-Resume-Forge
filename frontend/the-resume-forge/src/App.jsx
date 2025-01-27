import './App.css';
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes for routing
import React, { useEffect } from 'react'; 
import Signup from './Pages/Signup'; // Import Signup page component
import Login from './Pages/Login'; // Import Login page component
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast for notifications
import Home from './Pages/Home'; // Import Home page component
import { useAuthStore } from './store/useAuthStore'; // Import authentication store for user state management
import Resumes from './Pages/Resumes'; // Import Resumes page component
import Builder from './Pages/Builder'; // Import Resume Builder page component
import Navbar from './components/Navbar'; // Import Navbar component
import ResumeEditor from './Pages/ResumeEditor'; // Import Resume Editor component

function App() {
  const { authUser, initializeAuth, error} = useAuthStore(); // Destructure state and functions from authStore

  // Initialize authentication on component mount
  useEffect(() => {
    
    initializeAuth(); // Call function to initialize authentication state

  }, [initializeAuth]); // Dependency array ensures effect runs only once

  // Handle user authentication state errors
  useEffect(() => {
    if (error) {
      toast.error(error); // Show error message if there's an error
    }
  }, [authUser, error]); // Dependencies include authUser and error

  return (
    <>
      <Toaster /> {/* Render the toast notifications */}
      {authUser && <Navbar />} {/* Render Navbar only if user is authenticated */}
      <Routes>
        {/* Define application routes */}
        <Route path='/signup' element={<Signup />} /> {/* Route for signup page */}
        <Route path='/login' element={<Login />} /> {/* Route for login page */}
        <Route path='/' element={authUser ? <Home /> : <Login />} /> {/* Home route redirects based on auth status */}
        <Route path='/resumes' element={authUser ? <Resumes /> : <Login />} /> {/* Resumes route redirects based on auth status */}
        <Route path='/builder' element={authUser ? <Builder /> : <Login />} /> {/* Resume builder route redirects based on auth status */}
        <Route path='/edit/:resumeId' element={authUser ? <ResumeEditor /> : <Login />} /> {/* Resume editor route redirects based on auth status */}
      </Routes>
    </>
  );
}

export default App; 
