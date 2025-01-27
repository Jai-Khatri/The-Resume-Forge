import React from 'react';

// CustomSections component to manage and display custom sections of a resume
const CustomSections = ({ customSections, onChange, onDelete, onAdd, allowAddDelete }) => {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold mb-4 text-white'>Custom Sections</h2>
      {Array.isArray(customSections) && customSections.length > 0 ? ( // Check if customSections is an array and has items
        customSections.map((section, index) => (
          <div key={section.id || index} className="mb-4 border p-4 rounded bg-gray-700">
             {/* Custom section card */}

            <label htmlFor={`sectionTitle-${index}`} className="sr-only">Section Title</label>
            <input
              id={`sectionTitle-${index}`} // Unique ID for the title input field
              type='text'
              placeholder='Section Title' 
              value={section.title} // Bind input value to section title
              onChange={(e) => onChange(e, 'customSections', index, 'title')} // Handle title change
              className='mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required // Mark input as required
            />

            <label htmlFor={`content-${index}`} className="sr-only">Content</label>

            <textarea
              id={`content-${index}`} // Unique ID for the content textarea
              placeholder="Content" 
              value={section.content} // Bind textarea value to section content
              onChange={(e) => onChange(e, 'customSections', index, 'content')} // Handle content change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark textarea as required
            />
            
            {allowAddDelete && ( // Conditionally render delete button if allowed
            
              <button
                type='button'
                onClick={() => onDelete('customSections', index)} // Call delete handler with section name and index
                className='bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-200'
              >
                Delete Section {/* Button to delete the custom section */}
              </button>

            )}
          </div>
        ))
      ) : (
        <div className="border p-4 rounded bg-gray-700">
          <p className="text-gray-400">No custom sections added yet.</p> {/* Message when no custom sections are present */}
        </div>
      )}
      
      {allowAddDelete && ( // Conditionally render add button if allowed
        <button 
          type='button' 
          onClick={() => onAdd('customSections')} // Call add handler with section name
          className='bg-blue-600 hover:bg-blue-500 text-white py-1 px-4 rounded mt-5 transition duration-200'
        >
          Add Custom Section {/* Button to add a new custom section */}
        </button> 
      )}
    </div> 
  ); 
}; 

export default CustomSections; 
