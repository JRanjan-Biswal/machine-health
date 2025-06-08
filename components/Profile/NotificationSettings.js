'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const NotificationSettings = () => {
  const [smsEnabled, setSmsEnabled] = useState(false);

  const toggleSMS = () => {
    setSmsEnabled(!smsEnabled);
  };

  return (
    <div className="flex flex-col w-full min-w-[141px] gap-2.5">
      <div className="flex flex-row">
        <h2 className="text-[#2D3E5C] text-lg font-bold font-lato leading-[34px]">
          Notification
        </h2>
      </div>
      <div className="flex flex-row justify-between items-center bg-[#DFE6EC] rounded-md px-3.5 py-2.5">
        <span className="text-[#2D3E5C] text-base font-medium font-montserrat leading-6">
          SMS
        </span>
        <button 
          onClick={toggleSMS}
          className="relative w-12 h-6 transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <Image
            src="/switch.png"
            alt="SMS toggle"
            width={48}
            height={24}
            className={`cursor-pointer transition-opacity ${smsEnabled ? 'opacity-100' : 'opacity-50'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;

