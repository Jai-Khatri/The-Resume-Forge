import React, { useState } from "react"; 
import Preview from "../components/Sections/Preview"; 
import { useAuthStore } from "../store/useAuthStore"; 
import toast from "react-hot-toast"; 
import ResumeForm from "../components/ResumeForms/ResumeForm"; 

const Builder = () => {

  // Initialize formData state with default structure for the resume
  
  const [formData, setFormData] = useState({
    title: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      city: "", 
      summary: "", 
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    customSections: [], 
  });

  const { createResume, error } = useAuthStore(); // Destructure createResume and error from authStore

  // Function to handle adding a new section (skills, experience, etc.)
  const handleAddSection = (section) => {
    // Prevent adding if section already has an empty item
    const existingItems = formData[section];
    const hasEmptyItem = existingItems.some(item => Object.values(item).every(value => value === ''));

    if (hasEmptyItem) {
      toast.error("Please fill in the existing empty item before adding a new one."); // Show error if there's an empty item
      return;
    }

    const newItem = {}; // Initialize new item object
    switch (section) {
      case "skills":
        newItem.skillName = ""; // Add skillName field for skills section
        break;
      case "experience":
        // Add fields for experience section
        newItem.jobTitle = "";
        newItem.companyName = "";
        newItem.startDate = ""; 
        newItem.endDate = ""; 
        newItem.responsibilities = ""; 
        break;
      case "education":
        // Add fields for education section
        newItem.degree = "";
        newItem.institution = "";
        newItem.startDate = ""; 
        newItem.endDate = ""; 
        break;
      case "certifications":
        // Add fields for certifications section
        newItem.certificationName = "";
        newItem.by = ""; 
        break;
      case "customSections": 
        // Add fields for custom sections
        newItem.sectionTitle = "";
        newItem.content = "";
        break;
      default:
        return; // Exit if section is not recognized
    }

    // Update formData with the new item added to the specified section
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  // Function to handle changes in input fields across different sections of the resume
  const handleChange = (e, section, index, field) => {
    const { value } = e.target; // Get the input value
  
    if (section === 'title') {
      setFormData({ ...formData, title: value }); // Update title directly
      return;
    }
  
    if (section === 'personalInfo') {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [field]: value, // Update specific field in personalInfo
        },
      });
      return;
    }
  
    if (Array.isArray(formData[section])) {
      // Update specific item in an array section (e.g., skills, education)
      const updatedSection = formData[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setFormData({ ...formData, [section]: updatedSection }); // Update state with new section data
    }
  };

  // Function to handle changes in personal information fields specifically
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target; // Get name and value from input
    
    setFormData(prevData => ({
      ...prevData,
      personalInfo: { ...prevData.personalInfo, [name]: value } // Update specific field in personalInfo
    }));
  };

  // Function to handle deletion of a section item by index
  const handleDeleteSection = (section, index) => {
    if (Array.isArray(formData[section])) {
      const updatedSection = formData[section].filter((_, i) => i !== index); // Remove item at specified index
      setFormData({ ...formData, [section]: updatedSection }); // Update state with modified section data
    }
  };

  // Function to handle resume creation on form submission
  const handleCreateResume = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Validate required fields before submission
      const isValid =
        formData.title.trim() &&
        formData.personalInfo.name.trim() &&
        formData.personalInfo.email.trim() &&
        formData.personalInfo.phone.trim() &&
        formData.personalInfo.city.trim();

      if (!isValid) {
        toast.error("Please fill in all required fields."); // Show error if validation fails
        return;
      }

      // Filter out empty fields from each section before submission
      const filteredEducation = formData.education.filter(
        (edu) => edu.degree && edu.institution
      );
  
      const filteredExperience = formData.experience.filter(
        (exp) => exp.jobTitle && exp.companyName && exp.startDate && exp.endDate
      );
  
      const filteredCertifications = formData.certifications.filter(
        (cert) => cert.certificationName && cert.by
      );
  
      const filteredSkills = formData.skills.filter((skill) => skill.skillName);
  
      const formattedData = {
        title: formData.title.trim(), // Trim whitespace from title
        personalInfo: {
          name: formData.personalInfo.name.trim(),
          email: formData.personalInfo.email.trim(),
          phone: formData.personalInfo.phone.trim(),
          city: formData.personalInfo.city.trim(),
          summary: formData.personalInfo.summary.trim(),
        },
        education: filteredEducation,
        experience: filteredExperience,
        skills: filteredSkills,
        certifications: filteredCertifications,
        customSections: formData.customSections.filter(
          (section) => section.sectionTitle && section.content
        ),
      };
  
      console.log("Submitting formatted data:", formattedData); 
  
      await createResume(formattedData); // Call createResume function with formatted data
      toast.success("Successfully created new resume!"); // Show success notification
      
      // Reset the form after successful submission
      setFormData({
          title: "",
          personalInfo: { name: "", email: "", phone: "", city: "", summary: "" },
          education: [],
          experience: [],
          skills: [],
          certifications: [],
          customSections: []
       });
      
    } catch (err) {
      toast.error(error || "Error creating resume"); // Show error notification on failure
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 h-full">
      {/* Form Section */}
      <ResumeForm 
        formData={formData} 
        setFormData={setFormData} 
        handleCreateResume={handleCreateResume} 
        onChange={handleChange} 
        onDelete={handleDeleteSection} 
        handlePersonalInfoChange={handlePersonalInfoChange}
        onAdd={handleAddSection}
       />
      
       <div className='flex-1 w-full bg-white'>
         <Preview formData={formData} /> 
       </div>
     </div>
   );
};

export default Builder;
