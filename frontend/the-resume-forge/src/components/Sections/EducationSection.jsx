import React from 'react';

// EducationSection component to manage and display education entries of a resume
const EducationSection = ({ education, onChange, onDelete, onAdd, allowAddDelete }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Education</h2>
      {Array.isArray(education) && education.length > 0 ? ( // Check if education is an array and has items
        education.map((edu, index) => (
          <div key={edu.id || index} className="mb-4 border p-4 rounded bg-gray-700">
             {/* Education card */}

            <label htmlFor={`degree-${index}`} className="sr-only">Degree</label>

            <input
              id={`degree-${index}`} // Unique ID for the degree input field
              type="text"
              placeholder="Degree" 
              value={edu.degree} // Bind input value to degree
              onChange={(e) => onChange(e, "education", index, "degree")} // Handle degree change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark input as required
            />

            <label htmlFor={`institution-${index}`} className="sr-only">Institution Name</label>

            <input
              id={`institution-${index}`} // Unique ID for the institution input field
              type="text"
              placeholder="Institution Name" 
              value={edu.institution} // Bind input value to institution name
              onChange={(e) => onChange(e, "education", index, "institution")} // Handle institution change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark input as required
            />

            <label htmlFor={`startDate-${index}`} className="sr-only">Start Date</label>

            <input
              id={`startDate-${index}`} // Unique ID for the start date input field
              type="date"
              value={edu.startDate} // Bind input value to start date
              onChange={(e) => onChange(e, "education", index, "startDate")} // Handle start date change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor={`endDate-${index}`} className="sr-only">End Date</label>

            <input
              id={`endDate-${index}`} // Unique ID for the end date input field
              type="date"
              value={edu.endDate} // Bind input value to end date
              onChange={(e) => onChange(e, "education", index, "endDate")} // Handle end date change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {allowAddDelete && ( // Conditionally render delete button if allowed

              <button
                type='button'
                onClick={() => onDelete('education', index)} // Call delete handler with section name and index
                className='bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-200'
              >
                Delete Education {/* Button to delete the education entry */}
              </button>
              
            )}
          </div>
        ))
      ) : (
        <div className="border p-4 rounded bg-gray-700">
          <p className="text-gray-400">No education added yet.</p> {/* Message when no education entries are present */}
        </div>
      )}

      {allowAddDelete && ( // Conditionally render add button if allowed
        <button 
          type='button' 
          onClick={() => onAdd('education')} // Call add handler with section name
          className='bg-blue-600 hover:bg-blue-500 text-white py-1 mt-5 px-4 rounded transition duration-200'
        >
          Add Education {/* Button to add a new education entry */}
        </button>
      )}
    </div>
  );
};

export default EducationSection; 
