import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import { useAuthStore } from '../store/useAuthStore.js'; 
import toast from 'react-hot-toast'; 

const Resumes = () => {
  const { resumes, fetchResumes, authUser, deleteResume, error } = useAuthStore(); // Destructure necessary functions and state from authStore

  // Fetch resumes when the component mounts or when authUser changes
  
  useEffect(() => {
    if (authUser) {
      fetchResumes(); // Fetch resumes if the user is authenticated
    }
  }, [fetchResumes, authUser]); // Dependencies for useEffect

  // Handle resume deletion
  const handleDelete = async (resumeId) => {
    const response = await deleteResume(resumeId); // Call deleteResume with the resume ID

    if (response) {
      toast.success("Successfully deleted resume!"); // Show success notification
      fetchResumes(); // Re-fetch resumes to update the list after deletion
    } else {
      toast.error(error || "Failed to delete resume."); // Show error notification if deletion fails
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Resumes</h1>

      {/* Check if resumes is defined and has length */}
      {resumes && resumes.length > 0 ? (
        <div className="w-full max-w-lg md:max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
          <ul className="space-y-4">
            {resumes.map((resume) => (
              <li key={resume._id} className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-xl font-semibold">{resume.title || 'Unnamed Resume'}</h2> {/* Display resume title or default text */}
                  <p className="text-gray-400">{resume.personalInfo?.email || 'No email provided'}</p> {/* Display email or default text */}
                </div>
                <div className="flex space-x-4">
                  <Link to={`/edit/${resume._id}`} className="text-blue-400 hover:underline"> {/* Link to edit resume */}
                    Edit Resume
                  </Link>
                  <button 
                    onClick={() => handleDelete(resume._id)} // Call handleDelete with the resume ID on click
                    className="text-red-400 hover:underline"
                  >
                    Delete 
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl mb-4">No resumes found!</h2> {/* Message when no resumes are available */}
          <p className="mb-4">Start building your first resume.</p>
        </div>
      )}

      {/* Create a New Resume Button */}
      <Link to="/builder" className="mt-8 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded">
        Create a New Resume 
      </Link>
    </div>
  );
};

export default Resumes;
