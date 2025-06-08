'use client';
import Image from 'next/image';

const LogoutButton = ({ onClick = () => {} }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full max-w-[292px] flex flex-row items-center justify-center gap-2 bg-[#d45815] text-white py-2.5 px-4 rounded-md hover:bg-[#c24d12] transition-colors duration-200"
    >
      <span className="font-semibold text-base leading-6">Logout</span>
      <Image
        src="/icon-sig.png"
        alt="Logout icon"
        width={24}
        height={24}
      />
    </button>
  );
};

export default LogoutButton;

