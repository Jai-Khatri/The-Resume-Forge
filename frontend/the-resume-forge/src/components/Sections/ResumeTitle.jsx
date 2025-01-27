import React from 'react';

// ResumeTitle component to manage and display the title of the resume
const ResumeTitle = ({ title, onChange, editable = true }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Resume Title (Job role)</h2> {/* Section title for the resume title input */}
      <label htmlFor="title" className="sr-only">Resume Title</label> {/* Screen reader only label for accessibility */}
      <input
        type="text"
        name="title"
        id="title" // Unique ID for the title input field
        placeholder="Enter Resume Title" 
        value={title} // Bind input value to the title prop
        onChange={(e) => editable && onChange(e)} // Call onChange function if editable
        className="mb-4 w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required // Make the input field required
        disabled={!editable} // Disable input if not editable
      />
    </div>
  );
};

export default ResumeTitle; 
