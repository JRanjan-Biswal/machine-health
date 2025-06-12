'use client';
import Image from 'next/image';
import Link from 'next/link';
import Profile from '../Profile/Profile';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SlArrowDown } from "react-icons/sl";
import { HeaderProvider, useHeader } from '@/context/HeaderContext';
import { MillOverViewProvider } from '@/context/MillOverview';
// import useUserLogedIn from '@/app/actions/isUserLoggedIn';

const Header = ({ showArrow, handleProfileButton, isPageLoaded }) => {
  const pathname = usePathname();
  const [pillPosition, setPillPosition] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      const { left, width } = activeLink.getBoundingClientRect();
      const container = document.querySelector('.nav-container');
      const containerLeft = container.getBoundingClientRect().left;

      setPillPosition({
        left: left - containerLeft,
        width
      });
    }
  }, [pathname]);

  const getActivePath = () => {
    if (pathname.includes('dashboard')) return 'dashboard';
    if (pathname.includes('stock-preparation')) return 'stock-preparation';
    if (pathname.includes('cost-benefit')) return 'cost-benefit';
    return '';
  };

  return (
    <>
      <div className='container'>
        <div className="relative flex flex-row items-center justify-between px-12 py-1 bg-white rounded-full border border-[#dfe6ec] min-h-[70px] w-full mt-4 shadow-custom-1">
          <div className="w-[134px] h-[20px] relative">
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Logo" width={134} height={20} />
            </Link>
          </div>

          <div className="flex flex-row gap-4 nav-container relative">
            {/* Sliding Pill */}
            <div
              className="absolute h-[40px] bg-[#d45815] rounded-full transition-all duration-500 ease-out"
              style={{
                left: `${pillPosition.left}px`,
                width: `${pillPosition.width}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}
            />

            <Link href="/dashboard">
              <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${pathname.includes('dashboard') ? 'active' : ''}`}>
                <span className={`${pathname.includes('dashboard') ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                  Home
                </span>
              </div>
            </Link>

            <Link href="/stock-preparation">
              <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${pathname.includes('stock-preparation') ? 'active' : ''}`}>
                <span className={`${pathname.includes('stock-preparation') ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                  Stock Preparation
                </span>
              </div>
            </Link>

            <Link href="/cost-benefit">
              <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${pathname.includes('cost-benefit') ? 'active' : ''}`}>
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
      </div>
    </>
  )
}

function LayoutContent({ children }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const pathname = usePathname();
  const { animateHeaderShow, handleAnimatedHeader, setAnimateHeaderShow, showAnimatedHeader } = useHeader();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    if (typeof window === undefined) return;

    if (pathname == "/stock-preparation" && window.innerHeight < 815) {
      handleAnimatedHeader()
    }
    else {
      setAnimateHeaderShow(true);
    }
  }, [pathname]);

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileButton = () => {
    setShowProfile(!showProfile);
  }

  // Move the conditional return after all hooks
  if (pathname === "/" || pathname === "/roi-report") {
    return (
      <div className={`transition-opacity duration-700 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-700 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-75'}`}>
      <div className={`${!animateHeaderShow ? '-translate-y-[200px]' : 'translate-y-0'} transtion-all duration-300`}>
        <Header showArrow={animateHeaderShow} handleProfileButton={handleProfileButton} isPageLoaded={isPageLoaded} />
      </div>

      {/* animated arro | header show hide */}
      {/* {
        pathname == "/stock-preparation" && */}
      <div className="arrow-container animated fadeInDown cursor-pointer z-[100]" onClick={() => setAnimateHeaderShow(prev => !prev)}>
        <div className="arrow-2">
          <SlArrowDown size={16} color='#fff' className={`${!animateHeaderShow ? 'rotate-180' : 'rotate-0'} transition-all duration-300`} />
        </div>
        <div className="arrow-1 animated hinge infinite zoomIn"></div>
      </div>
      {/* } */}

      {/* {
        !animateHeaderShow ? */}
      {/* <div className="arrow-container animated fadeInDown cursor-pointer z-[100]" onClick={() => handleAnimatedHeader()}>
            <div className="arrow-2">
              <SlArrowDown size={16} color='#fff' />
            </div>
            <div className="arrow-1 animated hinge infinite zoomIn"></div>
          </div> */}
      {/* : null
      } */}
      {children}
      <Profile handleProfileButton={handleProfileButton} showProfile={showProfile} setShowProfile={setShowProfile} />
    </div>
  );
}

function Layout({ children }) {

  return (
    <HeaderProvider>
      <MillOverViewProvider>
        <LayoutContent>
          {children}
        </LayoutContent>
      </MillOverViewProvider>
    </HeaderProvider>
  );
}

export default Layout;

