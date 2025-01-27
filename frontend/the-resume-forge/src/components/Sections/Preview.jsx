import React from 'react';
import { pdf } from '@react-pdf/renderer'; // Import pdf function to generate PDF
import ResumeDocument from './ResumeDocument'; // Import the ResumeDocument component for PDF generation

// Preview component to display the resume and handle PDF downloads
const Preview = ({ formData }) => {
  
  // Function to handle PDF download
  const handleDownload = async () => {

    // Create a PDF blob from the ResumeDocument using the current formData
    
    const blob = await pdf(<ResumeDocument formData={formData} />).toBlob();

    const url = URL.createObjectURL(blob); // Create a URL for the blob

    const link = document.createElement('a'); // Create a temporary link element

    link.href = url; // Set the link's href to the blob URL

    link.setAttribute('download', 'resume.pdf'); // Set the download attribute with a filename

    document.body.appendChild(link); // Append link to the body

    link.click(); // Programmatically click the link to trigger download

    document.body.removeChild(link); // Remove the link from the DOM after downloading
  };

  return (
    <div className="bg-white text-black h-full p-8 rounded-lg shadow-lg border mt-6">
      {/* Resume Title */}
      <h1 className="text-5xl font-bold text-center mb-8">{formData.title || "Your Resume Title"}</h1>

      {/* Personal Information */}
      <p className="text-center mb-6 text-lg">
        <strong>Name:</strong> {formData.personalInfo.name || "Your Name"} | 
        <strong> Phone:</strong> {formData.personalInfo.phone || "Your Phone"} | 
        <strong> Email:</strong> {formData.personalInfo.email || "Your Email"} |
        <strong> City:</strong> {formData.personalInfo.city || "Your City"}
      </p>

      {/* Summary Section */}
      {formData.personalInfo.summary && formData.personalInfo.summary.trim() ? (
        <>
          <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Summary</h2>
          <p className="text-lg mb-6">{formData.personalInfo.summary}</p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Summary</h2>
          <p className="text-lg mb-6">No summary provided.</p>
        </>
      )}

      {/* Skills Preview in Two Columns */}
      {formData.skills.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mt-6 border-b pb-2 mb-4">Skills</h2>
          <div className="flex flex-wrap">
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="w-1/2 p-2">
                <p className="text-lg">{skill.skillName}</p> {/* Display each skill */}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experience Preview */}
      {formData.experience.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mt-6 border-b pb-2 mb-4">Experience</h2>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-lg"><strong>{exp.jobTitle}</strong> at {exp.companyName}</p>
              <p className="text-lg">From: {new Date(exp.startDate).toLocaleDateString()} To: {new Date(exp.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </>
      )}

      {/* Education Preview */}
      {formData.education.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mt-6 border-b pb-2 mb-4">Education</h2>
          {formData.education.map((edu, idx) => (
            <p key={idx} className="text-lg mb-4">{edu.degree} from {edu.institution} ({edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate && new Date(edu.endDate).getFullYear()})</p>
          ))}
        </>
      )}

      {/* Certifications Preview */}
      {formData.certifications.length > 0 && (
        <>
          {/*Display each certification*/}
          <h2 className="text-3xl font-semibold mt-6 border-b pb-2 mb-4">Certifications</h2>
          {formData.certifications.map((cert, idx) => ( 
            <p key={idx} className="text-lg mb-4">{cert.certificationName} by {cert.by}</p> 
          ))}
        </>
      )}

      {/* Custom Sections Preview */}
      {formData.customSections.length > 0 && (
        <>
          {formData.customSections.map((section, idx) => (
            <div key={idx} className="mt-6 mb-8">
              <h3 className="text-xl font-semibold">{section.sectionTitle}</h3>
              <p className="text-lg">{section.content}</p> {/* Display custom section content */}
            </div>
          ))}
        </>
      )}

      {/* Download Button */}
      <div className="flex justify-center mt-auto">
       <button 
         onClick={handleDownload} // Trigger PDF download on click
         style={{
           textDecoration: 'none',
           backgroundColor: '#3b82f6',
           color: 'white',
           padding: '10px 20px',
           borderRadius: '5px',
           cursor: 'pointer',
         }}
       >
         Download Resume as PDF {/* Button text for downloading resume */}
       </button>
     </div>

   </div>
 );
};

export default Preview;
