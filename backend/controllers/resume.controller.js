import User from '../models/user.model.js'; 
import { createCompletion } from '../libs/ai.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Handle error responses
const handleErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

// Create a new resume
export const createResume = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  try {
    if (!token) {
      return handleErrorResponse(res, 401, "Unauthorized: No token provided");
    }

    const decoded = verifyToken(token); 
    const userId = decoded.id;

    const { title, personalInfo, skills, experience, education, certifications, customSections } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return handleErrorResponse(res, 404, "User not found");
    }

    // Validate required fields
    if (!title || !personalInfo?.name || !personalInfo?.phone || !personalInfo?.email || !personalInfo?.city) {
      return handleErrorResponse(res, 400, "All personal information fields are required.");
    }

    // Validate education entries
    if (education && education.length > 0) {
      for (const edu of education) {
        if (!edu.degree || !edu.institution || !edu.graduationYear) {
          return handleErrorResponse(res, 400, "Each education entry must include degree, institution, and graduationYear.");
        }
      }
    }

    // Validate experience entries
    if (experience && experience.length > 0) {
      for (const exp of experience) {
        if (!exp.jobTitle || !exp.companyName || !exp.startDate || !exp.endDate) {
          return handleErrorResponse(res, 400, "Each experience entry must include jobTitle, companyName, startDate, and endDate.");
        }
      }
    }

    // Validate certification entries
    if (certifications && certifications.length > 0) {
      for (const cert of certifications) {
        if (!cert.certificationName || !cert.by) {
          return handleErrorResponse(res, 400, "Each certification must include certificationName and by (issuer).");
        }
      }
    }

    // Create and save the new resume
    const newResume = { title, personalInfo, skills, experience, education, certifications, customSections };
    user.resumes.push(newResume);
    await user.save();

    return res.status(201).json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("Error in createResume:", error.message);
    return handleErrorResponse(res, 500, "Server error");
  }
};

// Update an existing resume
export const updateResume = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    if (!token) {
      return handleErrorResponse(res, 401, "Unauthorized: No token provided");
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const { title, personalInfo, education, experience, skills, certifications, customSections } = req.body;
    
    if (!userId || !req.params.resumeId) {
      return handleErrorResponse(res, 400, 'User ID and Resume ID are required');
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    const resume = user.resumes.id(req.params.resumeId);
    
    if (!resume) {
      return handleErrorResponse(res, 404, 'Resume not found');
    }

    // Update fields only if provided
    if (title) resume.title = title;
    
    if (personalInfo) resume.personalInfo = { ...resume.personalInfo, ...personalInfo };
    
    // Validate and update education entries
    if (education) {
      for (const edu of education) {
        if (!edu.degree || !edu.institution || !edu.graduationYear) {
          return handleErrorResponse(res, 400,"Each education entry must include degree, institution, and graduationYear.");
        }
      }
      resume.education = education;
    }

   // Validate and update experience entries
   if (experience) {
     for (const exp of experience) {
       if (!exp.jobTitle || !exp.companyName || !exp.startDate || !exp.endDate) {
         return handleErrorResponse(res, 400,"Each experience entry must include jobTitle, companyName,startDate,and endDate.");
       }
     }
     resume.experience = experience;
   }

   // Update skills field if provided
   if (skills) resume.skills = skills;

   // Validate and update certification entries
   if (certifications) {
     for (const cert of certifications) {
       if (!cert.certificationName || !cert.by) {
         return handleErrorResponse(res, 400,"Each certification must include certificationName and by (issuer).");
       }
     }
     resume.certifications = certifications;
   }

   // Update custom sections field if provided
   if (customSections) resume.customSections = customSections;

   await user.save();
   
   return res.status(200).json({ message: 'Resume updated successfully', resume });
 } catch (error) {
   console.log("Error in updateResume:", error.message);
   return handleErrorResponse(res, 500,'Server error');
 }
};

// Delete a specific resume by ID
export const deleteResume = async (req,res)=>{
  const token = req.headers['authorization']?.split(' ')[1];

  try {
   if (!token) {
     return handleErrorResponse(res, 401,"Unauthorized: No token provided");
   }

   const decoded = verifyToken(token);
   const userId = decoded.id;

   if (!userId || !req.params.resumeId) {
     return handleErrorResponse(res, 400,'User ID and Resume ID are required');
   }

   const user = await User.findById(userId);
   
   if (!user) {
     return handleErrorResponse(res, 404,'User not found');
   }

   user.resumes.pull(req.params.resumeId);
   
   await user.save();
   
   return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
   console.log("Error in deleteResume:", error.message);
   return handleErrorResponse(res, 500,'Server error');
  }
};

// Fetch all resumes for a specific user
export const fetchResumes = async (req,res)=>{
  const token = req.headers['authorization']?.split(' ')[1];

  try {
   if (!token) {
     return handleErrorResponse(res, 401,"Unauthorized: No token provided");
   }

   const decoded = verifyToken(token);
   const userId = decoded.id; 

   // Ensure User ID is valid 
   if (!userId) { 
       return handleErrorResponse(res,400,'User ID is required'); 
   }

   const user = await User.findById(userId).select('resumes');
   
   if (!user) { 
     return handleErrorResponse(res ,404,'User not found'); 
   }

   res.status(200).json(user.resumes);
  } catch (error) { 
   console.error('Error fetching resumes:', error); 
   return handleErrorResponse(res ,500,'Server error'); 
  } 
};

// Fetch a specific resume by its ID for a specific user 
export const fetchResumeById = async (req,res)=>{ 
  const token = req.headers['authorization']?.split(' ')[1];

  try { 
     if (!token) { 
       return handleErrorResponse(res ,401,"Unauthorized: No token provided"); 
     }

     const decoded = verifyToken(token); 
     const userId = decoded.id; 

     // Ensure both User ID and Resume ID are provided 
     if (!userId || !req.params.resumeId) { 
       return handleErrorResponse(res ,400,'User ID and Resume ID are required'); 
     } 

     const user = await User.findById(userId); 

     if (!user) { 
       return handleErrorResponse(res ,404,'User not found'); 
     } 

     const resume = user.resumes.id(req.params.resumeId); 

     if (!resume) { 
       return handleErrorResponse(res ,404,'Resume not found'); 
     } 

     return res.status(200).json(resume); 
  } catch (error) { 
     console.error("Error fetching resume by ID:", error.message); 
     return handleErrorResponse(res ,500,'Server error'); 
  } 
};

// Generate a summary for a given job role using AI functionality  
export const generateResumeSummary = async (req,res)=>{
  const { jobrole , info }= req.body;

  // Validate input fields  
  if (!jobrole || !info ) {
    return handleErrorResponse(res ,400,'Job role and information are required.');
  }

  try {
    // Call AI function to generate summary  
    const completion= await createCompletion(jobrole , info);

    // Extract AI's response  
    const aiResponse= completion.choices[0].message.content;

    // Return AI's response  
    return res.status(200).json({ summary: aiResponse });
  
} catch(error){
console.error("Error generating summary:", error);
return handleErrorResponse(res ,500,'An error occurred while generating the summary.');
}
};
