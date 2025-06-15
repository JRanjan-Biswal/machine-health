import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRef } from 'react';

const ProfileHeader = ({ profileImage = '/profile-dummy.png', setProfileImage }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/user/upload-user-profile-photo', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload profile picture');
        }

        const result = await response.json();
       
        setProfileImage("https://api.healthmonitorapp.online" + result?.backendData?.media?.url);
      } 
      catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 p-2">
      {
        profileImage && (
          <div className="w-[58px] h-[58px] relative overflow-hidden border border-[#dfe6ec] rounded-full">
            <Image
              src={profileImage}
              alt="Profile"
              width={58}
              height={58}
              className="object-cover h-full w-full"
            />
          </div>
        )
      }

      <button
        className="flex flex-row items-center gap-2 px-4 py-2 bg-[#dfe6ec] rounded-md hover:bg-[#d0dae3] transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
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

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileHeader;
