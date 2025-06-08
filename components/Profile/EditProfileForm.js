import React from 'react';

const EditProfileForm = () => {
  return (
    <div className="flex flex-col w-full max-w-[292px]">
      <h2 className="text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px] mb-[10px]">
        Edit Profile
      </h2>
      
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input 
            type="text"
            defaultValue="Feroz Khan"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none"
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input 
            type="email"
            defaultValue="Feroz.Khan@Kadant.com"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] lowercase focus:outline-none"
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input 
            type="tel"
            defaultValue="0123456789"
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none"
          />
        </div>

        <div className="flex flex-row w-full h-[44px] border border-[#96A5BA] rounded-[6px] px-[20px] py-[10px]">
          <input 
            type="text"
            defaultValue="Owner"
            readOnly
            className="w-full text-[16px] font-normal font-montserrat text-[#2D3E5C] focus:outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;

