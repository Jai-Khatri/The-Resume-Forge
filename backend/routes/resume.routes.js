import express from 'express';
import { createResume, fetchResumes, updateResume, deleteResume, fetchResumeById, generateResumeSummary } from '../controllers/resume.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = express.Router();

router.post("/createResume/:userId", authenticate, createResume);
router.post("/updateResume/:userId/:resumeId", authenticate, updateResume);
router.get("/fetchResumes/:userId", authenticate, fetchResumes);
router.get("/fetchResume/:userId/:resumeId", authenticate, fetchResumeById); 
router.delete("/deleteResume/:userId/:resumeId", authenticate, deleteResume); 
router.post('/generate-summary', authenticate, generateResumeSummary);

export default router;
