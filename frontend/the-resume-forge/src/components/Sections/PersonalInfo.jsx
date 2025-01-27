import { React, useState } from 'react'; // Import React and useState hook
import SummaryPopup from '../SummaryPopup'; 

// PersonalInfo component to manage and display personal information fields
const PersonalInfo = ({ personalInfo, onChange, editable = true }) => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  return (
    <div className="mb-6 border p-4 rounded bg-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Personal Information</h2>
      
      {/* Name Input */}
      <label htmlFor='name' className='sr-only'>Full Name</label>
      <input
        type='text'
        name='name'
        id='name'
        placeholder='Full Name'
        value={personalInfo.name || ''} // Ensure it defaults to an empty string if undefined
        onChange={(e) => editable && onChange(e, 'personalInfo', null, 'name')} // Pass null for index since it's not an array
        required // Make it a required field
        className='mb-4 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={!editable} // Disable input if not editable
      />

      {/* Email Input */}
      <label htmlFor='email' className='sr-only'>Email Address</label>
      <input
        type='email'
        name='email'
        id='email'
        placeholder='Email Address'
        value={personalInfo.email || ''} // Ensure it defaults to an empty string if undefined
        onChange={(e) => editable && onChange(e, 'personalInfo', null, 'email')} // Handle email change
        required // Make it a required field
        className='mb-4 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={!editable} // Disable input if not editable
      />

      {/* Phone Input */}
      <label htmlFor='phone' className='sr-only'>Phone Number</label>
      <input
        type='tel'
        name='phone'
        id='phone'
        placeholder='Phone Number' 
        value={personalInfo.phone || ''} // Ensure it defaults to an empty string if undefined
        onChange={(e) => editable && onChange(e, 'personalInfo', null, 'phone')} // Handle phone change
        className='mb-4 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={!editable} // Disable input if not editable
      />

      {/* City Input */}
      <label htmlFor='city' className='sr-only'>City</label>
      <input
        type='text'
        name='city'
        id='city'
        placeholder='City'
        value={personalInfo.city || ''} // Ensure it defaults to an empty string if undefined
        onChange={(e) => editable && onChange(e, 'personalInfo', null, 'city')} // Handle city change
       className='mb-4 w-full p-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'  
       disabled={!editable} // Disable input if not editable
     />

     {/* Summary Textarea */}
     <label htmlFor='summary' className='sr-only'>Summary</label>
     <textarea
       name='summary'
       id='summary'
       placeholder="Summary"
       value={personalInfo.summary || ''} // Ensure it defaults to an empty string if undefined
       onChange={(e) => editable && onChange(e, 'personalInfo', null, 'summary')} // Handle summary change
       className="mb-4 w-full p-2 rounded bg-gray-600 text-white focus:outline-none mt-5 focus:ring-2 focus:ring-blue-500"
       disabled={!editable} // Disable textarea if not editable
     />

     {/* Button to open Summary Popup */}
     <button 
        onClick={() => setIsPopupOpen(true)} // Open the summary popup on click
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate Summary for Resume {/* Button text */}
      </button>

      {/* Summary Popup */}
      <SummaryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} /> {/* Render summary popup with open state and close handler */}
    </div>
  );
};

export default PersonalInfo; 
