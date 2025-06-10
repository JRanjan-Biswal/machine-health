import { RiArrowLeftSLine } from "react-icons/ri";
import styles from './sidebar.module.css';
import React from "react";
import { useEffect } from "react";

const formatCurrency = (value, currencyCode) => {
    if (!value || !currencyCode) return '0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const Sidebar  = ({ handleSideBarView, showSideBar }) => {
    const [spareParts, setSpareParts] = React.useState([]);
    const [sparePartData, setSparePartData] = React.useState(null);

    const fetchSparePart = async () => {
        const response = await fetch('/api/sparepart');
        const data = await response.json();

        setSpareParts(data.data);
        setSparePartData(data.data.find(sparePart => sparePart._id === '684363cf58886bd63a211b24'));
    }

    useEffect(() => {
        fetchSparePart();
    }, []);

    return (
        <>
            <div className={`${showSideBar ? 'w-[334px]' : 'w-[70px] bg-white rounded-2xl'} relative transition-all duration-300 h-full shadow-custom-1`}>
                <div className={`w-full h-full overflow-hidden ${styles.sidebar}`}>
                    {/* Main container */}
                    <div className={`relative w-full h-full overflow-y-auto bg-white rounded-xl border border-[#dfe6ec] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-thumb]:hiden dark:[&::-webkit-scrollbar-track]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${showSideBar ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                        {/* Header */}
                        <div className="w-full h-[62px] bg-[#2d3e5c] rounded-t-xl flex items-center justify-center">
                            <h1 className="text-white text-2xl font-bold font-montserrat">
                                HydrapulperTM
                            </h1>
                        </div>

                        {/* Content container */}
                        <div className="flex flex-col gap-4 h-fit">
                            {/* Key Data Points Section */}
                            <div className="flex flex-col gap-4 p-4 h-[calc(100svh_-_350px)] overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-thumb]:hiden dark:[&::-webkit-scrollbar-track]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <h2 className="text-[#2d3e5c] text-xl font-medium font-montserrat">
                                    Key Data Points
                                </h2>

                                <div className="flex flex-col gap-5">
                                    {/* Basic Info */}
                                    <div className="flex flex-col gap-2.5">
                                        <p className="text-[#607797] text-base font-medium">Capacity of Line: {sparePartData?.clientMachineSparePart?.capacityOfLine?.value} {sparePartData?.clientMachineSparePart?.capacityOfLine?.unit}</p>
                                        <p className="text-[#607797] text-base font-medium">Daily running Hours: {sparePartData?.clientMachineSparePart?.dailyRunningHours?.value} {sparePartData?.clientMachineSparePart?.dailyRunningHours?.unit}</p>
                                        <p className="text-[#607797] text-base font-medium">Lifetime of rotor: {sparePartData?.clientMachineSparePart?.lifetimeOfRotor?.value} {sparePartData?.clientMachineSparePart?.lifetimeOfRotor?.unit}</p>
                                        <p className="text-[#607797] text-base font-medium">Total running Hours: {sparePartData?.clientMachineSparePart?.totalRunningHours?.value} {sparePartData?.clientMachineSparePart?.totalRunningHours?.unit}</p>
                                    </div>

                                    {/* Fiber Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Fiber Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">Fiber Loss: {sparePartData?.clientMachineSparePart?.totalFiberLoss?.value} {sparePartData?.clientMachineSparePart?.totalFiberLoss?.unit}</p>
                                        <p className="text-[#607797] text-base font-medium">Fiber Cost: {formatCurrency(
                                            sparePartData?.clientMachineSparePart?.fiberCost?.value,
                                            sparePartData?.clientMachineSparePart?.fiberCost?.priceUnit
                                        )} / {sparePartData?.clientMachineSparePart?.fiberCost?.perUnit}</p>
                                        <p className="text-[#607797] text-base font-medium">Total Fiber Loss Value: {formatCurrency(
                                            sparePartData?.clientMachineSparePart?.totalFiberLossCost?.value,
                                            sparePartData?.clientMachineSparePart?.totalFiberLossCost?.unit
                                        )}</p>
                                    </div>

                                    {/* Power Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Power Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">Installed Motor power: {sparePartData?.clientMachineSparePart?.installedMotorPower?.value} {sparePartData?.clientMachineSparePart?.installedMotorPower?.unit}</p>
                                        <p className="text-[#607797] text-base font-medium">Power Cost: {formatCurrency(
                                            sparePartData?.clientMachineSparePart?.powerCost?.value,
                                            sparePartData?.clientMachineSparePart?.powerCost?.priceUnit
                                        )} / {sparePartData?.clientMachineSparePart?.powerCost?.perUnit}</p>
                                        <p className="text-[#607797] text-base font-medium">Total Power Cost: {formatCurrency(
                                            sparePartData?.clientMachineSparePart?.totalPowerLossCost?.value,
                                            sparePartData?.clientMachineSparePart?.totalPowerLossCost?.unit
                                        )}</p>
                                    </div>

                                    {/* Total Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Total Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">Total Loss: {formatCurrency(
                                            sparePartData?.clientMachineSparePart?.totalLossCost?.value,
                                            sparePartData?.clientMachineSparePart?.totalLossCost?.unit
                                        )}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content container */}
                            <div className="flex flex-col gap-4 h-fit">
                                {/* Key Data Points Section */}
                                <div className="flex flex-col gap-4 p-4 h-[calc(100svh_-_350px)] overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-thumb]:hiden dark:[&::-webkit-scrollbar-track]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
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
                                <div className="w-full h-[1px] bg-[#dfe6ec] my-4 absolute bottom-17"></div>

                                {/* Detail Cost Report Button */}
                                <div className="flex justify-centern absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
                                    <button onClick={() => setIsModalOpen(true)} className="cursor-pointer flex items-center gap-5 px-8 py-3 bg-[#f0f8fe] text-[#607797] rounded-full border-[1.5px] border-[#607797] hover:bg-[#e0f0fe] transition-colors mx-auto">
                                        <span className="text-base font-semibold">Detail Cost Report</span>
                                        {/* <Image src="/icon-dow.png" alt="Download" width={24} height={24} /> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Icon Frame */}
                    <div className={`absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 transition-all duration-300 flex items-center justify-center ${!showSideBar ? 'bg-primary-blue rotate-180' : 'bg-[#dfe6ec] rotate-0'} p-[5px] rounded-full cursor-pointer`} onClick={handleSideBarView}>
                        <RiArrowLeftSLine size={25} color={showSideBar ? '#2d3e5c' : 'white'} />
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="h-[90svh] overflow-y-scroll w-max">
                    <div className="flex justify-end items-center cursor-pointer">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <RoiReport contentData={contentData} />
                </div>
            </Modal>
        </>
    );
};

export default Sidebar;