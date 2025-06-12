'use client';
import React, { useCallback, useState } from 'react';
import { PiEye } from 'react-icons/pi';
import { TbEyeClosed } from 'react-icons/tb';
import { toast } from "sonner"

const ChangePasswordForm = () => {

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/update-password', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message, { color: '#1d1d1d' });
    }
    catch (error) {

      toast.error(error.message, { color: '#1d1d1d' });
    }
  }, [formData]);

  return (
    <div className="flex flex-col w-full max-w-md gap-4 bg-white">
      <h2 className="text-[#2D3E5C] text-lg font-bold font-lato leading-[34px]">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-4">
          <div className='relative'>
            <input
              type={showPassword == 'oldPassword' ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              autoComplete='off'
              required
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => prev === 'oldPassword' ? false : 'oldPassword')}
              className="absolute right-[14px] top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {
                showPassword == 'oldPassword' ? <PiEye className="text-[#1d1d1d] w-6 h-6" /> : <TbEyeClosed className="text-[#1d1d1d] w-6 h-6" />
              }
            </button>
          </div>

          <div className='relative'>
            <input
              type={showPassword == 'newPassword' ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              autoComplete='off'
              required
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => prev === 'newPassword' ? false : 'newPassword')}
              className="absolute right-[14px] top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {
                showPassword == 'newPassword' ? <PiEye className="text-[#1d1d1d] w-6 h-6" /> : <TbEyeClosed className="text-[#1d1d1d] w-6 h-6" />
              }
            </button>
          </div>

          <div className='relative'>
            <input
              type={showPassword == 'confirmPassword' ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              autoComplete='off'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-base font-normal font-montserrat text-[#2D3E5C] border border-[#96A5BA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3E5C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => prev === 'confirmPassword' ? false : 'confirmPassword')}
              className="absolute right-[14px] top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {
                showPassword == 'confirmPassword' ? <PiEye className="text-[#1d1d1d] w-6 h-6" /> : <TbEyeClosed className="text-[#1d1d1d] w-6 h-6" />
              }
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 bg-[#2D3E5C] text-white text-base font-semibold font-montserrat rounded-md hover:bg-[#1F2937] transition-colors duration-200"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
