'use client';
import Image from 'next/image';

const SupportSection = () => {
  return (
    <div className="flex flex-col gap-2.5 min-w-[141px]">
      <h2 className="text-[#2D3E5C] font-lato text-lg font-bold leading-[34px]">
        Support
      </h2>
      <button 
        className="flex flex-row items-center gap-1.5 bg-[#DFE6EC] rounded-md px-2.5 py-2.5 hover:bg-[#d0d9e2] transition-colors"
        onClick={() => console.log('Contact support clicked')}
      >
        <span className="text-[#2D3E5C] font-montserrat text-base font-medium leading-6">
          Contact
        </span>
        <Image
          src="/icon-use.png"
          alt="Contact icon"
          width={24}
          height={24}
          className="object-contain"
        />
      </button>
    </div>
  );
};

export default SupportSection;

