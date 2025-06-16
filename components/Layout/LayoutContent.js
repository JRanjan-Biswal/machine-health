import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useHeader } from "@/context/HeaderContext";
import Header from "./Header";
import { SlArrowDown } from "react-icons/sl";
import Profile from '../Profile/Profile';

function LayoutContent({ children }) {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const pathname = usePathname();
    const { animateHeaderShow, handleAnimatedHeader, setAnimateHeaderShow, showAnimatedHeader } = useHeader();

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            const response = await fetch('/api/user/get-logged-in-user');
            const data = await response.json();
            setLoggedInUser(data.data);
            setProfileImage("https://api.healthmonitorapp.online/uploads/profile-pictures/" + data.data?.image);
        }
        fetchLoggedInUser();

    }, [pathname]);

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


    const handleProfileButton = () => setShowProfile(!showProfile);


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
            <div className="relative container">
                <div className={`${!animateHeaderShow ? '-translate-y-[200px]' : 'translate-y-0'} transtion-all duration-300`}>
                    <Header showArrow={animateHeaderShow} profileImage={profileImage} handleProfileButton={handleProfileButton} isPageLoaded={isPageLoaded} />
                </div>

                <div className="arrow-container animated fadeInDown cursor-pointer z-[100]" onClick={() => setAnimateHeaderShow(prev => !prev)}>
                    <div className="arrow-2">
                        <SlArrowDown size={16} color='#fff' className={`${!animateHeaderShow ? 'rotate-0' : 'rotate-180'} transition-all duration-300`} />
                    </div>
                    <div className="arrow-1 animated hinge infinite zoomIn"></div>
                </div>
            </div>
            {/* animated arro | header show hide */}
            {children}
            <Profile handleProfileButton={handleProfileButton} setProfileImage={setProfileImage} loggedInUser={loggedInUser} showProfile={showProfile} setShowProfile={setShowProfile} profileImage={profileImage} />
        </div>
    );
}

export default LayoutContent;