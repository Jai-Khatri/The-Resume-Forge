import { create } from "zustand"; // Import zustand for state management
import { axiosInstance } from '../libs/axios.js'; // Import configured axios instance for API requests
import { toast } from 'react-hot-toast'; // Import toast for notifications

// Create an authentication store using zustand

export const useAuthStore = create((set, get) => ({

    authUser: null, // State to hold authenticated user data
    isLoggingIn: false, // State to track logging in status
    isSigningUp: false, // State to track signing up status
    error: null, // State to hold error messages
    resumes: [], // State to hold user's resumes

    // Function to initialize authentication state from local storage

    initializeAuth: () => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (token) {
            try {
                const user = JSON.parse(localStorage.getItem('authUser')); // Parse user data from local storage
                set({ authUser: user }); // Set authenticated user state
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`; // Set default authorization header for axios
            } catch (error) {
                console.error("Error parsing user data:", error); // Log error if parsing fails
                set({ authUser: null }); // Reset authUser state if parsing fails
            }
        }
    },

    // Function to handle unauthorized access by logging out the user

    handleUnauthorized: () => {
        get().logout(); // Call logout function to clear user data
        toast.error("Session expired. Please log in again."); // Show session expiration message
    },

    // Function to handle user signup

    signup: async (data) => {
        set({ isSigningUp: true, error: null }); // Set signing up state and reset error state
        try {
            const response = await axiosInstance.post("/createUser", data); // Send signup request to the server
            set({ isSigningUp: false }); // Reset signing up state on success
            return true; // Return true on successful signup
        } catch (error) {
            set({ isSigningUp: false, error: error.response?.data?.message || error.message }); // Set error state on failure
            console.log("Error in useAuthStore/signup!!!", error.message); // Log the error message
            return false; // Return false on failure
        }
    },

    // Function to handle user login

    login: async (data) => {
        set({ isLoggingIn: true, error: null }); // Set logging in state and reset error state
        try {
            const response = await axiosInstance.post("/getUser", data); // Send login request to the server
            const { token } = response.data; // Extract token from the response

            // Store token and user data in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('authUser', JSON.stringify(response.data.user));

            set({ authUser: response.data.user, isLoggingIn: false }); // Update authUser state and reset logging in state
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`; // Set default header for axios with token
            return response.data.user; // Return user data on success
        } catch (error) {
            set({ isLoggingIn: false, error: error.response?.data?.message || error.message }); // Set error state on failure
            console.log("Error in useAuthStore/login!!", error.message); // Log the error message
            return null; // Return null on failure
        }
    },

    // Function to handle user logout

    logout: () => {
        set({ authUser: null }); // Reset authUser state to null
        localStorage.removeItem('token'); // Remove token from local storage
        localStorage.removeItem('authUser'); // Remove user data from local storage
        delete axiosInstance.defaults.headers['Authorization']; // Remove the Authorization header from axios instance
    },

    // Function to fetch resumes of the authenticated user 

    fetchResumes: async () => {
        try {
            const { authUser } = get(); 
            if (!authUser || !authUser._id) { 
                throw new Error('User not authenticated'); 
            }

            const response = await axiosInstance.get(`/fetchResumes/${authUser._id}`); 
            set({ resumes: response.data }); 
        } catch (error) {
            console.error('Error in useAuthStore/fetchResumes', error.message); 
            set({ error: error.response?.data?.message || error.message });

             if (error.response?.status === 401) { 
                get().handleUnauthorized(); 
             }
        }
    },

    // Function to fetch a specific resume by its ID 

    fetchResumeById: async (resumeId) => {
        try {
            const { authUser } = get(); 
            if (!authUser || !authUser._id) { 
                throw new Error('User not authenticated'); 
            }

            const response = await axiosInstance.get(`/fetchResume/${authUser._id}/${resumeId}`); 
            return response.data; 
        } catch (error) {
            console.error('Error in useAuthStore/fetchResumeById', error.message); 
            set({ error: error.response?.data?.message || error.message });

             if (error.response?.status === 401) { 
                get().handleUnauthorized(); 
             }
        }
    },

    // Function to create a new resume 

    createResume: async (data) => {
        set({ error: null }); 
        try {
            const { authUser } = get(); 
            if (!authUser || !authUser._id) { 
                throw new Error('User not authenticated'); 
            }

            const response = await axiosInstance.post(`/createResume/${authUser._id}`, data); 

            if (response.status === 201) { 
                return true; 
            } else { 
                return false; 
            }
        } catch (error) {
            console.log("Error in useAuthStore/createResume", error.message); 
            set({ error: error.response?.data?.message || "Failed to create resume. Please try again." });

             if (error.response?.status === 401) { 
                get().handleUnauthorized(); 
             }

             return false; 
        }
    },

    // Function to delete a specific resume by its ID 

    deleteResume: async (resumeId) => {
        set({ error: null }); 
        try {
            const { authUser } = get(); 
            if (!authUser || !authUser._id) { 
                throw new Error('User not authenticated'); 
            }

            const response = await axiosInstance.delete(`/deleteResume/${authUser._id}/${resumeId}`); 

            if (response.status === 200) { 
                return true; 
            } else { 
                return false; 
            }
        } catch (error) {
             console.log("Error in useAuthStore/deleteResume", error.message); 
             set({ error: error.response?.data?.message || "Failed to delete resume. Please try again." });

              if (error.response?.status === 401) { 
                 get().handleUnauthorized(); 
              }

              return false; 
         }
     },

     // Function to update a specific resume by its ID with new form data  

     updateResume: async (resumeId, formData) => {
         set({ error: null });  
         try {
           const { authUser } = get();
           if (!authUser || !authUser._id) {
               throw new Error('User not authenticated');
           }

           const response = await axiosInstance.post(`/updateResume/${authUser._id}/${resumeId}`, formData);

           if (response.status === 200) {
               return response.data;  
           } else{
               return false;
           }
         } catch (error) {
           console.error("Error updating resume:", error);
           set({ error: error.response ? error.response.data.message : error.message });

           if (error.response?.status === 401) {
              get().handleUnauthorized();  
           }
       }
   },
    
   // Function to generate a summary based on job role and additional information  
   
   writeSummary: async (jobRole, info) => {
       set({ error: null });  
       try {
           const response = await axiosInstance.post('/generate-summary', { jobrole: jobRole, info });

           if (response.status === 200) {
               return response.data.summary;  
           } else {
               return null;  
           }
       } catch (error) {
             console.error("Error generating summary:", error);
             set({ error: error.response ? error.response.data.message : error.message });

              if (error.response?.status === 401) {
                 get().handleUnauthorized();  
              }

              return null;  
         }
     }
}));
