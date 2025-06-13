'use client';
import { useHeader } from "@/context/HeaderContext";
import BusinessSnapshot from "@/components/Home/BusinessSnapshot";
import MainImageSection from "@/components/Home/MainImageSection";

const Home = ({ userData, clientData }) => {
    const { animateHeaderShow } = useHeader();
    return (
        <div className="flex flex-col w-full container mt-[20px]">

            {/* Main Content Section */}
            <div className={`flex flex-grow flex-row gap-3 transition-all duration-300 ${!animateHeaderShow ? '-translate-y-[80px]' : '-translate-y-0'}`}>
                {/* Main Image and Welcome Section */}
                <div className={`flex-grow shadow-custom-1 rounded-lg bg-white overflow-hidden transition-all duration-300 ${!animateHeaderShow ? 'h-[calc(100vh-50px)]' : 'h-[calc(100vh-130px)]'}`}>
                    <MainImageSection
                        userName={userData?.name?.split(' ')?.[0]}
                        clientData={clientData}
                    />
                </div>

                {/* Business Snapshot Section */}
                <aside className="flex-none w-1/4 rounded-lg overflow-hidden">
                    <BusinessSnapshot clientData={clientData} />
                </aside>
            </div>
        </div>
    )
}

export default Home;