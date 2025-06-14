import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";

const Header = ({ showArrow, handleProfileButton, isPageLoaded, profileImage }) => {
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
        if (pathname.includes('home')) return 'home';
        if (pathname.includes('facility')) return 'facility';
        if (pathname.includes('stock-preparation')) return 'stock-preparation';
        if (pathname.includes('cost-benefit')) return 'cost-benefit';
        return '';
    };

    return (
        <>
            <div className=''>
                <div className="relative flex flex-row items-center justify-between px-12 py-1 bg-white rounded-full border border-[#dfe6ec] min-h-[70px] w-full mt-4 shadow-custom-1">
                    <div className="w-[134px] h-[20px] relative">
                        <Link href="/home">
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

                        <Link className="cursor-pointer flex items-center justify-center" href="/home">
                            <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${getActivePath() == 'home' ? 'active' : ''}`}>
                                <span className={`text-center ${getActivePath() == 'home' ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                                    Home
                                </span>
                            </div>
                        </Link>

                        <Link className="cursor-pointer flex items-center justify-center" href="/facility">
                            <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${getActivePath() == 'facility' ? 'active' : ''}`}>
                                <span className={`text-center ${getActivePath() == 'facility' ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                                    Facility
                                </span>
                            </div>
                        </Link>

                        <Link className="cursor-pointer flex items-center justify-center" href="/stock-preparation">
                            <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${getActivePath() == 'stock-preparation' ? 'active' : ''}`}>
                                <span className={`text-center ${getActivePath() == 'stock-preparation' ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                                    Stock Preparation
                                </span>
                            </div>
                        </Link>

                        <Link className="cursor-pointer flex items-center justify-center" href="/cost-benefit">
                            <div className={`nav-link flex items-center px-6 py-2 rounded-full relative z-10 transition-colors ${getActivePath() == 'cost-benefit' ? 'active' : ''}`}>
                                <span className={`text-center ${getActivePath() == 'cost-benefit' ? 'text-white' : 'text-[#2d3e5c]'} font-montserrat font-bold text-[16px] leading-[24px]`}>
                                    Cost Benefit Analysis
                                </span>
                            </div>
                        </Link>
                    </div>

                    <CurrencySelector />

                    <div className="w-[50px] h-[50px] relative border border-primary-blue rounded-full" onClick={handleProfileButton}>
                        {
                            profileImage && (
                                <Image
                                    src={profileImage} alt="User Profile" width={50} height={50}
                                    className="rounded-full cursor-pointer hover:opacity-90 transition-opacity h-full w-full object-cover"
                                />
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;