import React from 'react';
import ResumeTitle from '../Sections/ResumeTitle';
import PersonalInfo from '../Sections/PersonalInfo';
import SkillsSection from '../Sections/SkillsSection';
import ExperienceSection from '../Sections/ExperienceSection';
import EducationSection from '../Sections/EducationSection';
import CertificationsSection from '../Sections/CertificationsSection';
import CustomSections from '../Sections/CustomSections';

// ResumeFormEditor component to handle the editing of a resume
const ResumeFormEditor = ({ 
  formData = {}, // Object containing the current form data, default is an empty object
  onChange, // Function to handle changes in input fields throughout the form
  handleUpdateResume, // Function to handle the update of the resume
  onAdd, // Function to handle addition of new sections (skills, experience, etc.)
  onDelete // Function to handle deletion of sections (skills, experience, etc.)
}) => {

  // Destructure formData to extract relevant fields with default values

  const { 
    title = "", 
    personalInfo = {},
    skills = [],
    experience = [], 
    education = [], 
    certifications = [], 
    customSections = [] 
  } = formData;

  return (
    <div className="flex-shrink bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Title Section for the Resume */}
      <ResumeTitle title={title} onChange={(e) => onChange(e, 'title')} />
      
      {/* Personal Information Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <PersonalInfo 
          personalInfo={personalInfo} // Pass current personal info data to the component
          onChange={onChange} // Pass change handler for personal info fields
          editable={true} // Allow editing of personal information
        />
      </div>

      {/* Skills Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <SkillsSection 
          skills={skills} // Pass current skills array to the component
          onChange={onChange} // Pass change handler for skills input
          onDelete={onDelete} // Pass delete handler for skills section
          onAdd={() => onAdd('skills')} // Pass add handler for skills section
          allowAddDelete={true} // Allow add/delete functionality in SkillsSection
        />
      </div>

      {/* Experience Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <ExperienceSection 
          experience={experience} // Pass current experience array to the component
          onChange={onChange} // Pass change handler for experience input
          onDelete={onDelete} // Pass delete handler for experience section
          onAdd={() => onAdd('experience')} // Pass add handler for experience section
          allowAddDelete={true} // Allow add/delete functionality in ExperienceSection
        />
      </div>

      {/* Education Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <EducationSection 
          education={education} // Pass current education array to the component
          onChange={onChange} // Pass change handler for education input
          onDelete={onDelete} // Pass delete handler for education section
          onAdd={() => onAdd('education')} // Pass add handler for education section
          allowAddDelete={true} // Allow add/delete functionality in EducationSection
        />
      </div>

      {/* Certifications Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <CertificationsSection 
          certifications={certifications} // Pass current certifications array to the component
          onChange={onChange} // Pass change handler for certifications input
          onDelete={onDelete} // Pass delete handler for certifications section
          onAdd={() => onAdd('certifications')} // Pass add handler for certifications section
          allowAddDelete={true} // Allow add/delete functionality in CertificationsSection
        />
      </div>

      {/* Custom Sections */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <CustomSections 
          customSections={customSections} // Pass current custom sections array to the component
          onChange={onChange} // Pass change handler for custom sections input
          onDelete={onDelete} // Pass delete handler for custom sections section
          onAdd={() => onAdd('customSections')} // Pass add handler for custom sections section
          allowAddDelete={true} // Allow add/delete functionality in CustomSections
        />
      </div>

      {/* Update Resume Button */}
      <div>
        <p className='mb-3 text-red-600'>Note: Ensure you update the resume to save your changes.</p>
        <button
          type="button"
          onClick={handleUpdateResume} // Trigger resume update when clicked
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded transition duration-200 mb-6"
        >
          Update Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeFormEditor;
