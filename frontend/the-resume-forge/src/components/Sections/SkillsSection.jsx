import React from 'react';

// SkillsSection component to manage and display skills entries of a resume
const SkillsSection = ({ skills, onChange, onDelete, onAdd, allowAddDelete = true }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
      {Array.isArray(skills) && skills.length > 0 ? ( // Check if skills is an array and has items
        skills.map((skill, index) => (

          <div key={skill.id || index} className="mb-4 border p-4 rounded bg-gray-700"> {/* Skill card */}

            <label htmlFor={`skillName-${index}`} className="sr-only">Skill Name</label>

            <input
              id={`skillName-${index}`} // Unique ID for the skill name input field
              type="text"
              placeholder="Skill Name" 
              value={skill.skillName} // Bind input value to skill name
              onChange={(e) => onChange(e, "skills", index, "skillName")} // Handle skill name change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Make the input field required
            />

            {allowAddDelete && ( // Conditionally render delete button if allowed
              <button
                type="button"
                onClick={() => onDelete("skills", index)} // Call delete handler with section name and index
                className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-200"
              >
                Delete Skill {/* Button to delete the skill entry */}
              </button>
            )}
            
          </div>
        ))
      ) : (
        <div className="border p-4 rounded bg-gray-700">
          <p className="text-gray-400">No skills added yet.</p> {/* Message when no skills are present */}
        </div>
      )}

      {allowAddDelete && ( // Conditionally render add button if allowed
        <button
          type="button"
          onClick={() => onAdd("skills")} // Call add handler with section name
          className="bg-blue-600 hover:bg-blue-500 text-white py-1 mt-5 px-4 rounded transition duration-200"
        >
          Add Skill {/* Button to add a new skill entry */}
        </button>
      )}
    </div>
  );
};

export default SkillsSection; 
