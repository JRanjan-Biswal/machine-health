import React, { useEffect } from 'react';
import { toast } from "sonner"

const regexName = /^[a-zA-Z\s]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^[0-9]+$/;

const EditProfileForm = ({ loggedInUser }) => {

  const [formData, setFormData] = React.useState({
    name: loggedInUser?.name || '',
    email: loggedInUser?.email || '',
    phone: loggedInUser?.phone || '',
    designation: loggedInUser?.designation || ''
  });

  useEffect(() => {
    setFormData({
      name: loggedInUser?.name || '',
      email: loggedInUser?.email || '',
      phone: loggedInUser?.phone || '',
      designation: loggedInUser?.designation || ''
    });
  }, [loggedInUser]);

  // validation | change functionality
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // form submit functionality | api call
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    if (!regexName.test(formData.name)) {
      toast.error('Name must contain only letters and spaces', { color: '#1d1d1d' });
      return;
    }
    if (!regexEmail.test(formData.email)) {
      toast.error('Invalid email format', { color: '#1d1d1d' });
      return;
    }
   
    if (!regexPhone.test(formData.phone)) {
      toast.error('Invalid phone number', { color: '#1d1d1d' });
      return;
    }

    try {
      const response = await fetch('/api/user/update-user', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message, { color: '#1d1d1d' });
    } catch (error) {
      toast.error(error.message, { color: '#1d1d1d' });
    }
  }, [formData]);


  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px] mb-[10px]">
        Edit Profile
      </h2>

      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input
            autoComplete='off'
            value={formData.name}
            type="text"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none"
            onChange={handleChange}
            name="name"
            placeholder='Enter your name'
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input
            autoComplete='off'
            value={formData.email}
            type="email"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] lowercase focus:outline-none"
            onChange={handleChange}
            name="email"
            placeholder='Enter your email'
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input
            autoComplete='off'
            value={formData.phone}
            type="tel"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none"
            onChange={handleChange}
            name="phone"
            placeholder='Enter your phone number'
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input
            autoComplete='off'
            type="text"
            value={formData.designation}
            readOnly
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none cursor-default"
            name="designation"
            placeholder='Enter your designation'
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full mt-2 px-4 py-2 bg-[#2D3E5C] text-white text-base font-semibold font-montserrat rounded-md hover:bg-[#1F2937] transition-colors duration-200"
      >
        Update Profile
      </button>
    </div>
  );
};

export default EditProfileForm;

