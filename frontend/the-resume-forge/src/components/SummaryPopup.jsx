import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 
import { useAuthStore } from '../store/useAuthStore.js'; 

// SummaryPopup component to generate a resume summary based on user input

const SummaryPopup = ({ isOpen, onClose }) => {
  const [jobRole, setJobRole] = useState(''); // State to hold the job role input
  const [info, setInfo] = useState(''); // State to hold additional information input
  const [summary, setSummary] = useState(''); // State to hold the generated summary
  const [loading, setLoading] = useState(false); // State to manage loading status
  
  const { writeSummary } = useAuthStore(); // Destructure the writeSummary function from authStore

  // Function to handle summary generation
  const handleGenerateSummary = async () => {

    // Validate inputs
    
    if (!jobRole || !info) {
      toast.error("Please provide Job Role and Info related to the job"); // Show error if inputs are missing
      return;
    }

    setLoading(true); // Set loading state to true while generating summary
    try {
      const generatedSummary = await writeSummary(jobRole, info); // Call the writeSummary function
      
      if (generatedSummary) {
        setSummary(generatedSummary); // Update state with the generated summary
      } else {
        toast.error("Failed to generate summary. Please try again."); // Show error if generation fails
      }
    } catch (error) {
      console.error("Error generating summary:", error); // Log error to console
      toast.error('Failed to generate summary:', error); // Show error notification
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    isOpen ? ( // Render the popup only if it is open
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-black rounded-lg p-6 w-11/12 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Generate Resume Summary</h2>
          <label className="block mb-2">Job Role:</label>
          <input
            type="text"
            value={jobRole} // Bind input value to jobRole state
            onChange={(e) => setJobRole(e.target.value)} // Update jobRole state on change
            className="border rounded w-full p-2 mb-4"
            placeholder="Enter job role" 
          />
          <label className="block mb-2">Information:</label>
          {/* Tip for user */}
          <p className="text-gray-400 text-sm mb-2">
            Tip: The information for the job can be found in the responsibilities,
            description, or skills section of the job role. Once you are done pasting those,
            you can include info about your own experience and projects.
          </p>
          <textarea
            value={info} // Bind textarea value to info state
            onChange={(e) => setInfo(e.target.value)} // Update info state on change
            className="border rounded w-full p-2 mb-4"
            placeholder="Enter relevant information" // Placeholder text for textarea
            rows="4" 
          />
          <button
            onClick={handleGenerateSummary} // Trigger summary generation on click
            className={`bg-blue-600 hover:bg-blue-500 mr-4 text-white py-2 px-4 rounded mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Generating...' : 'Generate Summary'} {/* Button text changes based on loading state */}
          </button>
          {summary && ( // Render generated summary if it exists
            <div>
              <h3 className="font-semibold">Generated Summary:</h3>
              <p className="border p-2 rounded my-2">{summary}</p> {/* Display the generated summary */}
              <button
                onClick={() => navigator.clipboard.writeText(summary)} // Copy summary to clipboard on click
                className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded"
              >
                Copy Summary {/* Button to copy the generated summary */}
              </button>
            </div>
          )}
          <button
            onClick={onClose} // Close the popup when clicked
            className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded mt-4"
          >
            Close {/* Button to close the popup */}
          </button>
        </div>
      </div>
    ) : null // Return null if the popup is not open
  );
};

export default SummaryPopup; 
