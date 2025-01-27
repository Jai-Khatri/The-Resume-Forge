import React, { useEffect, useState } from 'react';
import ResumeFormEditor from '../components/ResumeForms/ResumeFormEditor';
import { useParams } from 'react-router-dom'; // Import useParams for route parameters
import { useAuthStore } from '../store/useAuthStore'; // Import authentication store
import Preview from '../components/Sections/Preview';
import toast from 'react-hot-toast'; 

const ResumeEditor = () => {
  const { resumeId } = useParams(); // Get the resume ID from the URL parameters
  const { fetchResumeById, updateResume, error } = useAuthStore(); // Destructure functions from authStore
  
  // Initialize formData with a default structure for the resume
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

  // Fetch the resume data when the component mounts or when resumeId changes
  useEffect(() => {
    const fetchResume = async () => {
      const data = await fetchResumeById(resumeId); // Fetch resume data by ID
      // Set formData to fetched data or keep the default structure
      setFormData(data || {
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
    };

    fetchResume(); // Call the fetch function
  }, [resumeId, fetchResumeById]); // Dependencies for useEffect

  // Handle changes in input fields for different sections of the resume
  const handleChange = (e, section, index, field) => {
    const { value } = e.target; // Get the value from the input field
  
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

  // Add a new item to a specified section of the resume
  const handleAddItem = (section) => {
    const newItem = section === 'skills' ? "" : { title: "", description: "" }; // Adjust based on your section structure
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem], // Append new item to the section array
    });
  };

  // Delete an item from a specified section of the resume
  const handleDeleteItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index); // Filter out the item at the specified index
    setFormData({ ...formData, [section]: updatedSection }); // Update state with new section data
  };

  // Handle updating the resume with current form data
  const handleUpdateResume = async () => {
    try {
      const check = await updateResume(resumeId, formData); // Call update function with ID and data
      if (check) {
        toast.success("Resume Updated successfully!"); // Show success notification on successful update
      } else {
        toast.error("Error updating Resume :- ", error); // Show error notification on failure
      }
    } catch (error) {
      console.error("Error updating resume:", error); // Log error to console
      toast.error("Failed to update resume. Please try again."); // Show error to the user on failure
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center mt-3 mb-4">Edit Resume</h1>
        <ResumeFormEditor 
          formData={formData} 
          onChange={handleChange} 
          handleUpdateResume={handleUpdateResume} 
          onAdd={handleAddItem} // Pass the add item handler to ResumeFormEditor
          onDelete={handleDeleteItem} // Pass the delete item handler to ResumeFormEditor
        />
      </div>
      
      <div className="flex-1">
        <Preview formData={formData} /> {/* Render preview of the resume */}
      </div>
    </div>
  );
};

export default ResumeEditor;
