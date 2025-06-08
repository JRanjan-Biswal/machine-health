import React from 'react';
import Image from 'next/image';

const ProfileHeader = ({ profileImage = '/profile-dummy.png' }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-2">
      <div className="w-[58px] h-[58px] relative rounded-full overflow-hidden">
        <Image 
          src={profileImage}
          alt="Profile"
          width={58}
          height={58}
          className="object-cover"
        />
      </div>
      
      <button className="flex flex-row items-center gap-2 px-4 py-2 bg-[#dfe6ec] rounded-md hover:bg-[#d0dae3] transition-colors">
        <Image
          src="/icon-upl.png"
          alt="Upload"
          width={20}
          height={20}
        />
        <span className="text-[#2d3e5c] font-montserrat font-medium text-sm">
          Upload Photo
        </span>
      </button>
    </div>
  );
};

export default ProfileHeader;
