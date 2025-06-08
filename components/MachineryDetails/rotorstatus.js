import Image from 'next/image';
import React from 'react';

const RotorStatus = ({ items = [
  {
    title: 'Rotor',
    image: '/placeholder.svg',
    status: 'Attention',
    statusColor: 'bg-[#bf1e21ff]'
  },
  {
    title: 'Rotor Hub',
    image: '/placeholder.svg',
    status: 'Healthy',
    statusColor: 'bg-[#00a82dff]'
  },
  {
    title: 'Rotor Shaft',
    image: '/placeholder.svg',
    status: 'Healthy', 
    statusColor: 'bg-[#00a82dff]'
  },
  {
    title: 'Bedplate',
    image: '/placeholder.svg',
    status: 'Monitor',
    statusColor: 'bg-[#ff9a00ff]'
  }
] }) => {
  return (
    <div className="flex flex-row gap-[13px]">
      {items.map((item, index) => (
        <div key={index} className="bg-[#dfe6ecff] rounded-[6px] w-1/4 h-[111px] relative overflow-hidden">
          <h3 className="text-[#2d3e5cff] font-bold text-base leading-[20px] p-[11px]">
            {item.title}
          </h3>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image 
              src={item.image}
              alt={item.title}
              width={118}
              height={107}
              className="object-contain"
              priority
            />
          </div>

          <div className={`absolute bottom-0 w-full h-[26px] ${item.statusColor} flex justify-end items-center`}>
            <span className="text-white font-bold text-[14px] leading-[20px] uppercase mr-[14px]">
              {item.status}
            </span>
          </div>
        </div>
      ))}

      <div className="bg-[#dfe6ecff] rounded-[6px] w-[53px] h-[111px] flex items-center justify-center">
        <div className="rounded-full bg-[#dfe6ecff] p-[12px] hover:bg-[#c4ccd3] transition-colors cursor-pointer">
          <Image 
            src="/icon.png"
            alt="More"
            width={24}
            height={24}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default RotorStatus;
