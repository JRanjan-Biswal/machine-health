import { RiArrowLeftSLine } from "react-icons/ri";
import styles from './sidebar.module.css';
import React from "react";
import { useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { convertAndFormatWithContext, convertAndFormatWithContextNoSymbol } from "@/lib/currencyChange";
// import Modal from "./Modal";

const formatCurrency = (value, currencyCode) => {
    if (!value || !currencyCode) return '0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const Sidebar = ({ data, setIsModalPDFOpen, lineCapacity, dailyRunningHours, lifetimeOfRotor, totalRunningHours, fiberLoss, fiberCost, totalFiberLossCost, installedMotorPower, powerCost, totalPowerLossCost, totalLossCost, handleSideBarView, showSideBar }) => {

    const { selectedCurrency, currencyValue } = useCurrency();

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
                                        <p className="text-[#607797] text-base font-medium">Capacity of Line: {lineCapacity} TPD</p>
                                        <p className="text-[#607797] text-base font-medium">Daily running Hours: {dailyRunningHours} Hrs</p>
                                        <p className="text-[#607797] text-base font-medium">Lifetime of rotor: {lifetimeOfRotor} Hrs</p>
                                        <p className="text-[#607797] text-base font-medium">Total running Hours: {totalRunningHours} Hrs</p>
                                    </div>

                                    {/* Fiber Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Fiber Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">Fiber Loss: {Math.round(fiberLoss)} Tons</p>
                                        <p className="text-[#607797] text-base font-medium">
                                            Fiber Cost: {convertAndFormatWithContext(fiberCost, { selectedCurrency, currencyValue })}/ton
                                        </p>
                                        <p className="text-[#607797] text-base font-medium">
                                            Total Fiber Loss Value: {convertAndFormatWithContext(totalFiberLossCost, { selectedCurrency, currencyValue })}
                                        </p>
                                    </div>

                                    {/* Power Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Power Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">Installed Motor power: {installedMotorPower} kw</p>
                                        <p className="text-[#607797] text-base font-medium">
                                            Power Cost: {convertAndFormatWithContextNoSymbol(powerCost, { selectedCurrency, currencyValue }, false)} {selectedCurrency == "EURO" ? "€" : "₹"}/kwhr
                                        </p>
                                        <p className="text-[#607797] text-base font-medium">
                                            Total Power Cost: {convertAndFormatWithContext(totalPowerLossCost, { selectedCurrency, currencyValue })}
                                        </p>
                                    </div>

                                    {/* Total Loss Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-[#2d3e5c] text-lg font-bold">Total Loss</h3>
                                        <p className="text-[#607797] text-base font-medium">
                                            Total Loss: {convertAndFormatWithContext(totalLossCost, { selectedCurrency, currencyValue })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-[1px] bg-[#dfe6ec] my-4 absolute bottom-17"></div>

                            {/* Detail Cost Report Button */}
                            <div className="flex justify-centern absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
                                <button onClick={() => setIsModalPDFOpen(true)} className="cursor-pointer flex items-center gap-5 px-8 py-3 bg-[#f0f8fe] text-[#607797] rounded-full border-[1.5px] border-[#607797] hover:bg-[#e0f0fe] transition-colors mx-auto">
                                    <span className="text-base font-semibold">Detail Cost Report</span>
                                    {/* <Image src="/icon-dow.png" alt="Download" width={24} height={24} /> */}
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Icon Frame */}
                    <div className={`absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 transition-all duration-300 flex items-center justify-center ${!showSideBar ? 'bg-primary-blue rotate-180' : 'bg-[#dfe6ec] rotate-0'} p-[5px] rounded-full cursor-pointer`} onClick={handleSideBarView}>
                        <RiArrowLeftSLine size={25} color={showSideBar ? '#2d3e5c' : 'white'} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;