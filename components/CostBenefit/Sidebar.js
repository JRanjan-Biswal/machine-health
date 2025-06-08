import Image from "next/image";
import { RiArrowLeftSLine } from "react-icons/ri";

const Sidebar = ({ handleSideBarView, showSideBar }) => {
    return (
        <div className={`${showSideBar ? 'w-[334px]' : 'w-[70px] bg-white rounded-2xl'} relative transition-all duration-300 h-full`}>
            <div className='w-full h-full overflow-hidden'>
                {/* Main container */}
                <div className={`w-full h-full overflow-scroll bg-white rounded-xl border border-[#dfe6ec] ${showSideBar ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                    {/* Header */}
                    <div className="w-full h-[62px] bg-[#2d3e5c] rounded-t-xl flex items-center justify-center">
                        <h1 className="text-white text-2xl font-bold font-montserrat">
                            HydrapulperTM
                        </h1>
                    </div>

                    {/* Content container */}
                    <div className="p-4 flex flex-col gap-4 h-full">
                        {/* Key Data Points Section */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-[#2d3e5c] text-xl font-medium font-montserrat">
                                Key Data Points
                            </h2>

                            <div className="flex flex-col gap-5">
                                {/* Basic Info */}
                                <div className="flex flex-col gap-2.5">
                                    <p className="text-[#607797] text-base font-medium">Capacity of Line: 400 tpd</p>
                                    <p className="text-[#607797] text-base font-medium">Daily running Hours: 24 Hrs</p>
                                    <p className="text-[#607797] text-base font-medium">Lifetime of rotor: 3600 Hrs</p>
                                    <p className="text-[#607797] text-base font-medium">Total running Hours: 5040 Hrs</p>
                                </div>

                                {/* Fiber Loss Section */}
                                <div className="flex flex-col gap-2.5">
                                    <h3 className="text-[#2d3e5c] text-lg font-bold">Fiber Loss</h3>
                                    <p className="text-[#607797] text-base font-medium">Fiber Loss: 92 tons</p>
                                    <p className="text-[#607797] text-base font-medium">Fiber Cost: € 200/ton</p>
                                    <p className="text-[#607797] text-base font-medium">Total Fiber Loss Value: € 18,400</p>
                                </div>

                                {/* Power Loss Section */}
                                <div className="flex flex-col gap-2.5">
                                    <h3 className="text-[#2d3e5c] text-lg font-bold">Power Loss</h3>
                                    <p className="text-[#607797] text-base font-medium">Installed Motor power: 500 kw</p>
                                    <p className="text-[#607797] text-base font-medium">Power Cost: 0.09 €/kwhr</p>
                                    <p className="text-[#607797] text-base font-medium">Total Power Cost: € 6,480</p>
                                </div>

                                {/* Total Loss Section */}
                                <div className="flex flex-col gap-2.5">
                                    <h3 className="text-[#2d3e5c] text-lg font-bold">Total Loss</h3>
                                    <p className="text-[#607797] text-base font-medium">Total Loss: € 24,880</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-[#dfe6ec] my-4"></div>

                        {/* Detail Cost Report Button */}
                        <div className="flex justify-center">
                            <button className="flex items-center gap-5 px-8 py-3 bg-[#f0f8fe] text-[#607797] rounded-full border-[1.5px] border-[#607797] hover:bg-[#e0f0fe] transition-colors">
                                <span className="text-base font-semibold">Detail Cost Report</span>
                                <Image
                                    src="/icon-dow.png"
                                    alt="Download"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon Frame */}
            <div className={`absolute top-[361px] right-0 translate-x-1/2 transition-all duration-300 flex items-center justify-center ${!showSideBar ? 'bg-primary-blue rotate-180' : 'bg-[#dfe6ec] rotate-0'} p-[5px] rounded-full cursor-pointer`} onClick={handleSideBarView}>
                <RiArrowLeftSLine size={25} color={showSideBar ? '#2d3e5c' : 'white'} />
            </div>
        </div>
    );
};

export default Sidebar;