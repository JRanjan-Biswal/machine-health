import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const tabs = [
  { id: 1, label: 'Pulping & Detrashing', active: true },
  { id: 2, label: 'HD Cleaning and Coarse Screening' },
  { id: 3, label: 'MD Cleaning' },
  { id: 4, label: 'Fine Screening' },
  { id: 5, label: 'LW Cleaning and Thickening' },
];

const NavigationTabs = ({ style = {} }) => {

  const visibleTabs = tabs.slice(0, 3);
  const hiddenTabs = tabs.slice(3,);

  const [activeTab, setActiveTab] = useState(tabs?.[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSlice = () => { };

  return (
    <div className={`flex flex-row items-center justify-start h-12 gap-2.5 px-0 py-0 ${style?.className || ''}`} style={style}>
      {visibleTabs?.map((tab) => (
        <button
          key={tab.id}
          className={cn("rounded-4xl font-semibold font-montserrat cursor-pointer px-7 py-[15px] whitespace-nowrap transition-all duration-500 ease-out relative overflow-hidden min-w-[160px] max-w-[200px] select-none hover:shadow-lg hover:max-w-[500px] hover:z-10", isExpanded ? 'max-w-[250px] flex-1 min-w-[160px]' : '', isExpanded && 'hover:max-w-[350px] hover:flex-[2]', activeTab?.id == tab.id ? 'bg-[#2d3e5c] text-white' : 'bg-[#dfe6ec] text-[#607797]')}
          style={{
            textOverflow: 'ellipsis',
            transformOrigin: 'center'
          }}
        >
          {/* <span className="font-semibold font-montserrat text-base leading-[18px]"> */}
          {tab.label}
          {/* </span> */}
        </button>
      ))}

      {/* Hidden tabs - conditionally rendered after visible tabs */}
      {isExpanded && hiddenTabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`rounded-4xl font-semibold font-montserrat cursor-pointer px-7 py-[15px] whitespace-nowrap transition-all duration-500 ease-out relative overflow-hidden min-w-[70px] max-w-[100px] select-none hover:shadow-lg hover:max-w-[500px] hover:z-10 ${isExpanded ? 'max-w-[200px] flex-1 min-w-[150px]' : ''} ${isExpanded && 'hover:max-w-[350px] hover:flex-[2]'} ${activeTab?.id == tab.id ? 'bg-[#2d3e5c] text-white' : 'bg-[#dfe6ec] text-[#607797]'}`}
          style={{
            textOverflow: 'ellipsis',
            transformOrigin: 'center',
          }}
        >
          <span className="font-semibold font-montserrat text-base leading-[18px]">
            {tab.label}
          </span>
        </button>
      ))}

      {/* Expand pill - always rendered last in the flex container */}
      <button
        onClick={handleExpandClick}
        className={`cursor-pointer text-sm font-medium transition-all duration-300 ease-out select-none shadow-lg `}
      >
        {/* <span>{isExpanded ? 'Less' : 'More'}</span>
        <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white transition-transform duration-300 ease-out ml-auto ${isExpanded ? 'rotate-180' : ''}`} /> */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#dfe6ec] hover:bg-[#d0d9e1] transition-colors" onClick={handleSlice}>
          <Image src="/icon.png" alt="settings" width={20} height={20} className={`w-6 h-6 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

    </div >
  );
};

export default NavigationTabs;

