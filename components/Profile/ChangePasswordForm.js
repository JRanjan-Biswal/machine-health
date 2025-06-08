'use client';
import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-4 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-[#2D3E5C] text-lg font-bold font-lato leading-[34px]">
        2. Change Password
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
          />
          
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
          />
          
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 bg-[#2D3E5C] text-white text-base font-semibold font-montserrat rounded-md hover:bg-[#1F2937] transition-colors duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
