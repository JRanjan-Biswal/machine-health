import Image from 'next/image';
import React from 'react';

const imageMap = {
  "684363cf58886bd63a211b24": "/rotor-card-1.png",
  "6845f978af4093194af7ee8d": "/rotor-card-2.png",
  "6845f98faf4093194af7ee8e": "/rotor-card-3.png",
  "6845f99daf4093194af7ee8f": "/rotor-card-4.png",
}

// [
//   {
//     title: 'Rotor',
//     image: '/rotor-card-1.png',
//     status: 'Attention',
//     statusColor: 'bg-[#bf1e21ff]'
//   },
//   {
//     title: 'Rotor Hub',
//     image: '/rotor-card-2.png',
//     status: 'Healthy',
//     statusColor: 'bg-[#00a82dff]'
//   },
//   {
//     title: 'Rotor Shaft',
//     image: '/rotor-card-3.png',
//     status: 'Healthy', 
//     statusColor: 'bg-[#00a82dff]'
//   },
//   {
//     title: 'Bedplate',
//     image: '/rotor-card-4.png',
//     status: 'Monitor',
//     statusColor: 'bg-[#ff9a00ff]'
//   }
// ]

const RotorStatus = ({ spareParts = [] }) => {

  const getSparePartColor = (sparePart) => {
    if (sparePart.clientMachineSparePart) {
      if (sparePart.clientMachineSparePart.totalRunningHours?.value > sparePart.lifeTime?.value) {
        return 'bg-[#bf1e21ff]';
      } else if (sparePart.clientMachineSparePart.totalRunningHours?.value == sparePart.lifeTime?.value) {
        return 'bg-[#ff9a00ff]';
      } else {
        return 'bg-[#00a82dff]';
      }
    }
  }

  const getSparePartStatus = (sparePart) => {
    if (sparePart.clientMachineSparePart) {
      if (sparePart.clientMachineSparePart.totalRunningHours?.value > sparePart.lifeTime?.value) {
        return 'Attention';
      } else if (sparePart.clientMachineSparePart.totalRunningHours?.value == sparePart.lifeTime?.value) {
        return 'Monitor';
      } else {
        return 'Healthy';
      }
    }
  }

  return (
    <div className="flex flex-row gap-[13px]">
      {spareParts.map((item, index) => (
        <div key={index} className="bg-[#dfe6ecff] rounded-[6px] w-1/4 h-[111px] relative overflow-hidden">
          <h3 className="text-[#2d3e5cff] font-bold text-base leading-[20px] p-[11px]">
            {item.name}
          </h3>

          <div className="absolute left-1/2 top-1/2 -translate-y-1/2">
            <Image src={imageMap[item._id]} alt={item.name} width={118} height={107} className="object-contain" priority />
          </div>

          <div className={`absolute bottom-0 w-full h-[26px] ${getSparePartColor(item)} flex justify-end items-center`}>
            <span className="text-white font-bold text-[14px] leading-[20px] uppercase mr-[14px]">
              {getSparePartStatus(item)}
            </span>
          </div>
        </div>
      ))}

      <div className="bg-[#dfe6ecff] rounded-[6px] w-[53px] h-[111px] flex items-center justify-center">
        <div className="rounded-full bg-[#dfe6ecff] p-[12px] hover:bg-[#c4ccd3] transition-colors cursor-pointer">
          <Image src="/icon.png" alt="More" width={24} height={24} priority />
        </div>
      </div>
    </div>
  );
};

export default RotorStatus;
