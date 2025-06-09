import Image from 'next/image';
import React, { useState } from 'react';

const NavigationTabs = ({ style = {} }) => {
  const tabs = [
    { id: 1, label: 'Pulping & Detrashing', active: true },
    { id: 2, label: 'HD Cleaning and Coarse Screening' },
    { id: 3, label: 'MD Cleaning' },
    { id: 4, label: 'Fine Screening' },
    { id: 5, label: 'LW Cleaning and Thickening' },
  ];

  const [sliceTab, setSliceTab] = useState(5);

  const handleSlice = () => {setSliceTab(sliceTab === 5 ? 3 : 5);};

  return (
    <div className={`flex flex-row items-center justify-start h-12 gap-2.5 px-0 py-0 ${style?.className || ''}`} style={style}>
      {tabs?.slice(0, sliceTab).map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-row items-center px-7 py-[15px] rounded-[50px] min-w-fit h-12
            ${tab.active 
              ? 'bg-[#2d3e5c] text-white' 
              : 'bg-[#dfe6ec] text-[#607797] hover:bg-[#2d3e5c] hover:text-white transition-colors'
            }
          `}
        >
          <span className="font-semibold font-montserrat text-base leading-[18px]">
            {tab.label}
          </span>
        </button>
      ))}
      
      <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#dfe6ec] hover:bg-[#d0d9e1] transition-colors" onClick={handleSlice}>
        <Image src="/icon.png" alt="settings" width={20} height={20} className={`w-6 h-6 rotate-180 ${tabs.length !== sliceTab && '!rotate-0'}`} />
      </button>
    </div>
  );
};

export default NavigationTabs;

