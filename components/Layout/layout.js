'use client';
import Image from 'next/image';
import Link from 'next/link';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import useUserLogedIn from '@/app/actions/isUserLoggedIn';

function Layout({ children }) {

  const pathname = usePathname();

  if (pathname == "/") return children

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileButton = () => setShowProfile(!showProfile);

  // const login = useUserLogedIn();
  // console.log(login)


  return (
    <>
      <div className='container'>
        <div className="flex flex-row items-center justify-between px-12 py-1 bg-white rounded-full border border-[#dfe6ec] min-h-[70px] w-full mt-4 shadow-custom-1">
          <div className="w-[134px] h-[20px] relative">
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Logo" width={134} height={20} />
            </Link>
          </div>

          <div className="flex flex-row gap-4">
            <Link href="/dashboard">
              <div className={`flex items-center px-6 py-2 rounded-full ${pathname.includes('dashboard') && 'bg-[#d45815]'} transition-colors`}>
                <span className={`${pathname.includes('dashboard') ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                  Home
                </span>
              </div>
            </Link>

            <Link href="/stock-preparation">
              <div className={`flex items-center px-6 py-2 rounded-full transition-colors ${pathname.includes('stock-preparation') && 'bg-[#d45815]'}`}>
                <span className={`${pathname.includes('stock-preparation') ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                  Stock Preparation
                </span>
              </div>
            </Link>

            <Link href="/cost-benefit">
              <div className={`flex items-center px-6 py-2 rounded-full transition-colors ${pathname.includes('cost-benefit') && 'bg-[#d45815]'}`}>
                <span className={`${pathname.includes('cost-benefit') ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                  Cost Benefit Analysis
                </span>
              </div>
            </Link>
          </div>

          <div className="w-[50px] h-[50px] relative" onClick={handleProfileButton}>
            <Image
              src="/profile-dummy.png"
              alt="User Profile"
              width={50}
              height={50}
              className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
        <Profile handleProfileButton={handleProfileButton} showProfile={showProfile} />
      </div>
      {children}

    </>
  );
};

export default Layout;

