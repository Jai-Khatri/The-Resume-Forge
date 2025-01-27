import React from 'react';

// CertificationsSection component to manage and display certifications
const CertificationsSection = ({ certifications, onChange, onDelete, onAdd, allowAddDelete }) => {

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Certifications</h2>
      {Array.isArray(certifications) && certifications.length > 0 ? ( // Check if certifications is an array and has items
      
        certifications.map((cert, index) => (
          <div key={cert.id || index} className="mb-4 border p-4 rounded bg-gray-700"> {/* Certification card */}
            <label htmlFor={`certificationName-${index}`} className="sr-only">Certification Name</label>
            <input
              id={`certificationName-${index}`} // Unique ID for the input field
              type="text"
              placeholder="Certification Name"
              value={cert.certificationName} // Bind input value to certification name
              onChange={(e) => onChange(e, "certifications", index, "certificationName")} // Handle input change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark input as required
            />

            <label htmlFor={`issuer-${index}`} className="sr-only">Issuer Name</label>
            <input
              id={`issuer-${index}`} // Unique ID for the issuer input field
              type="text"
              placeholder="Issuer Name" 
              value={cert.by} // Bind input value to issuer name
              onChange={(e) => onChange(e, "certifications", index, "by")} // Handle input change
              className="mb-2 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Mark input as required
            />

            {allowAddDelete && ( // Conditionally render delete button if allowed
              <button
                type="button"
                onClick={() => onDelete("certifications", index)} // Call delete handler with section and index
                className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded transition duration-200"
              >
                Delete Certification {/* Button to delete the certification */}
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="border p-4 rounded bg-gray-700">
          <p className="text-gray-400">No certifications added yet.</p> {/* Message when no certifications are present */}
        </div>
      )}
      {allowAddDelete && ( // Conditionally render add button if allowed
        <button
          type="button"
          onClick={() => onAdd("certifications")} // Call add handler with section name
          className="bg-blue-600 hover:bg-blue-500 text-white py-1 mt-5 px-4 rounded transition duration-200"
        >
          Add Certification {/* Button to add a new certification */}
        </button>
      )}
    </div>
  );
};

export default CertificationsSection;
