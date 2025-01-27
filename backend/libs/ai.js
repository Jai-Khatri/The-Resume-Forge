import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Function to create a completion for a specific job role
export const createCompletion = async (jobrole, info) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", 
    store: true,
    messages: [
      {
        role: "user",
        content: `Write a professional ATS friendly summary under 800 characters for a ${jobrole} role considering
         the following job role information and information about me: ${info}`,
      },
    ],
  });

  return completion; // Return the generated completion
};
