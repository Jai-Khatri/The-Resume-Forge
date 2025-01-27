import React from 'react';
import ResumeTitle from '../Sections/ResumeTitle';
import PersonalInfo from '../Sections/PersonalInfo';
import SkillsSection from '../Sections/SkillsSection';
import ExperienceSection from '../Sections/ExperienceSection';
import EducationSection from '../Sections/EducationSection';
import CertificationsSection from '../Sections/CertificationsSection';
import CustomSections from '../Sections/CustomSections';

// ResumeForm component to handle the creation and updating of a resume
const ResumeForm = ({ 
  formData, // Object containing the current form data for the resume
  setFormData, // Function to update the form data state
  handleCreateResume, // Function to handle the creation or update of the resume
  onChange, // Function to handle changes in input fields throughout the form
  onDelete, // Function to handle deletion of sections (skills, experience, etc.)
  onAdd, // Function to handle addition of new sections (skills, experience, etc.)
  allowAddDelete = true // Prop to control whether adding or deleting sections is allowed (default is true)
}) => {
  return (
    <div className="flex-shrink bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Title Section for the Resume */}
      <ResumeTitle title={formData.title} onChange={(e) => onChange(e, 'title')} />
      
      {/* Personal Information Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <PersonalInfo 
          personalInfo={formData.personalInfo} // Pass current personal info data to the component
          onChange={onChange} // Pass change handler for personal info fields
          editable={true} // Allow editing of personal information
        />
      </div>

      {/* Skills Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <SkillsSection 
          skills={Array.isArray(formData.skills) ? formData.skills : []} // Ensure skills is an array; default to empty array if not
          onChange={onChange} // Pass change handler for skills input
          onDelete={allowAddDelete ? onDelete : null} // Conditionally pass delete handler based on allowAddDelete prop
          onAdd={allowAddDelete ? () => onAdd('skills') : null} // Conditionally pass add handler based on allowAddDelete prop
          allowAddDelete={allowAddDelete} // Pass prop to control add/delete functionality in SkillsSection
        />
      </div>

      {/* Experience Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <ExperienceSection 
          experience={Array.isArray(formData.experience) ? formData.experience : []} // Ensure experience is an array; default to empty array if not
          onChange={onChange} // Pass change handler for experience input
          onDelete={allowAddDelete ? onDelete : null} // Conditionally pass delete handler for experience section
          onAdd={allowAddDelete ? () => onAdd('experience') : null} // Conditionally pass add handler for experience section
          allowAddDelete={allowAddDelete} // Pass prop to control add/delete functionality in ExperienceSection
        />
      </div>

      {/* Education Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <EducationSection 
          education={Array.isArray(formData.education) ? formData.education : []} // Ensure education is an array; default to empty array if not
          onChange={onChange} // Pass change handler for education input
          onDelete={allowAddDelete ? onDelete : null} // Conditionally pass delete handler for education section
          onAdd={allowAddDelete ? () => onAdd('education') : null} // Conditionally pass add handler for education section
          allowAddDelete={allowAddDelete} // Pass prop to control add/delete functionality in EducationSection
        />
      </div>

      {/* Certifications Section */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <CertificationsSection 
          certifications={Array.isArray(formData.certifications) ? formData.certifications : []} // Ensure certifications is an array; default to empty array if not
          onChange={onChange} // Pass change handler for certifications input
          onDelete={allowAddDelete ? onDelete : null} // Conditionally pass delete handler for certifications section
          onAdd={allowAddDelete ? () => onAdd('certifications') : null} // Conditionally pass add handler for certifications section
          allowAddDelete={allowAddDelete} // Pass prop to control add/delete functionality in CertificationsSection
        />
      </div>

      {/* Custom Sections */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <CustomSections 
          customSections={Array.isArray(formData.customSections) ? formData.customSections : []} // Ensure custom sections is an array; default to empty array if not
          onChange={onChange} // Pass change handler for custom sections input
          onDelete={allowAddDelete ? onDelete : null} // Conditionally pass delete handler for custom sections
          onAdd={allowAddDelete ? () => onAdd('customSections') : null} // Conditionally pass add handler for custom sections
          allowAddDelete={allowAddDelete} // Pass prop to control add/delete functionality in CustomSections
        />
      </div>

      {/* Create/Update Resume Button */}
      <div>
        <p className='mb-3 text-red-600'>
          Note: Ensure you create or update the resume so that you can return to it anytime by logging into your account.
        </p>
        <button
          type="button"
          onClick={handleCreateResume} // Trigger resume creation or update when clicked
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded transition duration-200 mb-6"
        >
          {formData.title ? "Update Resume" : "Create Resume"}
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
