import React from 'react';

// ExperienceSection component to manage and display work experience entries of a resume
const ExperienceSection = ({ experience, onChange, onDelete, onAdd, allowAddDelete }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Experience</h2>
      {Array.isArray(experience) && experience.length > 0 ? ( // Check if experience is an array and has items
        experience.map((exp, index) => (
          <div key={exp.id || index} className="mb-4 border p-4 rounded bg-gray-700"> 
          {/* Experience card */}

            <label htmlFor={`jobTitle-${index}`} className="sr-only">Job Title</label>

            <input
              id={`jobTitle-${index}`} // Unique ID for the job title input field
              type="text"
              placeholder="Job Title" 
              value={exp.jobTitle} // Bind input value to job title
              onChange={(e) => onChange(e, "experience", index, "jobTitle")} // Handle job title change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark input as required
            />

            <label htmlFor={`companyName-${index}`} className="sr-only">Company Name</label>

            <input
              id={`companyName-${index}`} // Unique ID for the company name input field
              type='text'
              placeholder='Company Name'
              value={exp.companyName} // Bind input value to company name
              onChange={(e) => onChange(e, 'experience', index, 'companyName')} // Handle company name change
              className='mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required // Mark input as required
            />

            <label htmlFor={`startDate-${index}`} className="sr-only">Start Date</label>

            <input
              id={`startDate-${index}`} // Unique ID for the start date input field
              type='date'
              value={exp.startDate} // Bind input value to start date
              onChange={(e) => onChange(e, 'experience', index, 'startDate')} // Handle start date change
              className='mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <label htmlFor={`endDate-${index}`} className="sr-only">End Date</label>

            <input
              id={`endDate-${index}`} // Unique ID for the end date input field
              type='date'
              value={exp.endDate} // Bind input value to end date
              onChange={(e) => onChange(e, 'experience', index, 'endDate')} // Handle end date change
              className='mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <label htmlFor={`responsibilities-${index}`} className="sr-only">Responsibilities</label>

            <textarea
              id={`responsibilities-${index}`} // Unique ID for the responsibilities textarea
              placeholder="Responsibilities" 
              value={exp.responsibilities} // Bind textarea value to responsibilities
              onChange={(e) => onChange(e, "experience", index, "responsibilities")} // Handle responsibilities change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {allowAddDelete && ( // Conditionally render delete button if allowed

              <button
                type="button"
                onClick={() => onDelete("experience", index)} // Call delete handler with section name and index
                className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-200"
              >
                Delete Experience {/* Button to delete the experience entry */}
              </button>
              
            )}
          </div>
        ))
      ) : (
        <div className="border p-4 rounded bg-gray-700">
          <p className="text-gray-400">No experience added yet.</p> {/* Message when no experience entries are present */}
        </div>
      )}

      {allowAddDelete && ( // Conditionally render add button if allowed
        <button 
          type="button" 
          onClick={() => onAdd("experience")} // Call add handler with section name
          className="bg-blue-600 hover:bg-blue-500 text-white mt-5 py-1 px-4 rounded transition duration-200"
        >
          Add Experience {/* Button to add a new experience entry */}
        </button>
      )}
    </div>
  );
};

export default ExperienceSection; 
