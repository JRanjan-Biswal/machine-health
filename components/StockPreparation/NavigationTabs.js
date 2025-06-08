import Image from 'next/image';
import React from 'react';

const NavigationTabs = ({ style = {} }) => {
  const tabs = [
    { id: 1, label: 'Pulping & Detrashing', active: true },
    { id: 2, label: 'Cleaning' },
    { id: 3, label: 'Screening' },
    { id: 4, label: 'Thickening' },
    { id: 5, label: 'Deinking' },
  ];

  return (
    <div className={`flex flex-row items-center justify-start h-12 gap-2.5 px-0 py-0 ${style?.className || ''}`} style={style}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-row items-center px-7 py-[15px] rounded-[50px] min-w-fit h-12
            ${tab.active 
              ? 'bg-[#2d3e5c] text-white' 
              : 'bg-[#dfe6ec] text-[#607797] hover:bg-[#d0d9e1] transition-colors'
            }
          `}
        >
          <span className="font-semibold font-montserrat text-base leading-[18px]">
            {tab.label}
          </span>
        </button>
      ))}
      
      <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#dfe6ec] hover:bg-[#d0d9e1] transition-colors ml-auto">
        <Image src="/icon.png" alt="settings" width={20} height={20} className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NavigationTabs;

