'use client'
import { useCallback, useMemo, useState } from 'react';
import NavigationBar from '@/components/CostBenefit/Navigationbar';
import Sidebar from '@/components/CostBenefit/Sidebar';
import MainContent from '@/components/CostBenefit/MainContent';
import { useHeader } from '@/context/HeaderContext';
import Modal from './Modal';
import { RiArrowRightSLine } from "react-icons/ri";
import EmailTemplate from "./EmailTemplate";
import Image from 'next/image';
import RoiReport from "./RoiReport";

const Costcompt = ({ data }) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const { animateHeaderShow } = useHeader();

    const [currentRunningHours, setCurrentRunningHours] = useState(data?.clientMachineSparePart?.totalRunningHours?.value);
    const [installedOn, setInstalledOn] = useState(data?.clientMachineSparePart?.machineData?.installationDate);
    const [barData, setBarData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPDFOpen, setIsModalPDFOpen] = useState(false);

    // --- General & Fiber Loss Inputs ---
    const [fiberCost, setFiberCost] = useState(data?.clientMachineSparePart?.fiberCost?.value);
    const [rotorLifetime, setRotorLifetime] = useState(data?.clientMachineSparePart?.lifetimeOfRotor?.value);
    const [lineCapacity, setLineCapacity] = useState(data?.clientMachineSparePart?.capacityOfLine?.value); // TPD
    const [dailyRunningHours, setDailyRunningHours] = useState(data?.clientMachineSparePart?.dailyRunningHours?.value);
    const [lossRangeA, setLossRangeA] = useState(data?.clientMachineSparePart?.fiberLossRanges?.[0]?.value);
    const [lossRangeB, setLossRangeB] = useState(data?.clientMachineSparePart?.fiberLossRanges?.[1]?.value);
    const [lossRangeC, setLossRangeC] = useState(data?.clientMachineSparePart?.fiberLossRanges?.[2]?.value);
    const [lossRangeD, setLossRangeD] = useState(data?.clientMachineSparePart?.fiberLossRanges?.[3]?.value);

    // --- State for Power Loss Inputs ---
    const [installedMotorPower, setInstalledMotorPower] = useState(data?.clientMachineSparePart?.installedMotorPower?.value);
    const [consumptionGoodRotor, setConsumptionGoodRotor] = useState(data?.clientMachineSparePart?.actualMotorPowerConsumption?.healthy?.value);
    const [consumptionWornRotor, setConsumptionWornRotor] = useState(data?.clientMachineSparePart?.actualMotorPowerConsumption?.wornout?.value);
    const [powerCost, setPowerCost] = useState(data?.clientMachineSparePart?.powerCost?.value);

    const resetChartData = useCallback(() => {


        setCurrentRunningHours(data?.clientMachineSparePart?.totalRunningHours?.value);
        setInstalledOn(data?.clientMachineSparePart?.machineData?.installationDate);

        // --- General & Fiber Loss Inputs ---
        setFiberCost(data?.clientMachineSparePart?.fiberCost?.value);
        setRotorLifetime(data?.clientMachineSparePart?.lifetimeOfRotor?.value);
        setLineCapacity(data?.clientMachineSparePart?.capacityOfLine?.value); // TPD
        setDailyRunningHours(data?.clientMachineSparePart?.dailyRunningHours?.value);
        setLossRangeA(data?.clientMachineSparePart?.fiberLossRanges?.[0]?.value);
        setLossRangeB(data?.clientMachineSparePart?.fiberLossRanges?.[1]?.value);
        setLossRangeC(data?.clientMachineSparePart?.fiberLossRanges?.[2]?.value);
        setLossRangeD(data?.clientMachineSparePart?.fiberLossRanges?.[3]?.value);

        // --- State for Power Loss Inputs ---
        setInstalledMotorPower(data?.clientMachineSparePart?.installedMotorPower?.value);
        setConsumptionGoodRotor(data?.clientMachineSparePart?.actualMotorPowerConsumption?.healthy?.value);
        setConsumptionWornRotor(data?.clientMachineSparePart?.actualMotorPowerConsumption?.wornout?.value);
        setPowerCost(data?.clientMachineSparePart?.powerCost?.value);
    }, [data, setCurrentRunningHours, setInstalledOn, setBarData, setFiberCost, setRotorLifetime, setLineCapacity, setDailyRunningHours, setLossRangeA, setLossRangeB, setLossRangeC, setLossRangeD, setInstalledMotorPower, setConsumptionGoodRotor, setConsumptionWornRotor, setPowerCost])

    const chartData = useMemo(() => {
        // Shared variable for both calculations
        const I =
            currentRunningHours > rotorLifetime
                ? currentRunningHours - rotorLifetime
                : 0;

        // --- Power Loss Calculation ---
        let totalPowerLossCost = 0;
        if (I > 0) {
            const powerConsumptionGood =
                (installedMotorPower * consumptionGoodRotor) / 100;
            const powerConsumptionWorn =
                (installedMotorPower * consumptionWornRotor) / 100;
            const increaseInConsumption = powerConsumptionWorn - powerConsumptionGood;
            // overallPowerLoss is in kWh
            const overallPowerLoss = increaseInConsumption * I;
            totalPowerLossCost = overallPowerLoss * powerCost;
        }

        // --- Fiber Loss Calculation ---
        const totalProduction = lineCapacity * dailyRunningHours;
        const lossCalculationBase = totalProduction / 24 / 24;
        let fiberLoss = 0;
        if (I > 0) {
            const pA = lossRangeA / 100;
            const pB = lossRangeB / 100;
            const pC = lossRangeC / 100;
            const pD = lossRangeD / 100;

            const hoursInTierA = Math.max(0, Math.min(I, 240));
            const hoursInTierB = Math.max(0, Math.min(I, 480) - 240);
            const hoursInTierC = Math.max(0, Math.min(I, 720) - 480);
            const hoursInTierD = Math.max(0, I - 720);

            const lossFromA = hoursInTierA * pA;
            const lossFromB = hoursInTierB * pB;
            const lossFromC = hoursInTierC * pC;
            const lossFromD = hoursInTierD * pD;

            fiberLoss =
                lossCalculationBase * (lossFromA + lossFromB + lossFromC + lossFromD);
        }
        const totalFiberLossCost = fiberLoss * fiberCost;

        // --- UPDATED: Total Loss is now the sum of both calculations ---
        const totalLoss = totalFiberLossCost + totalPowerLossCost;

        // --- Chart Bar Height Calculation ---
        const maxBarHeight = 320;
        const maxChartValue = Math.max(totalLoss * 1.5, 20000);

        const height1 = (totalPowerLossCost / maxChartValue) * maxBarHeight;
        const height2 = (totalFiberLossCost / maxChartValue) * maxBarHeight;
        const height3 = (totalLoss / maxChartValue) * maxBarHeight;

        // --- Slider Thumb Color Logic ---
        const extendedHours = currentRunningHours - rotorLifetime;
        let thumbColor;
        if (extendedHours > 720) {
            thumbColor = "var(--slider-red)";
        } else if (extendedHours > 480) {
            thumbColor = "var(--slider-orange)";
        } else {
            thumbColor = "var(--slider-green)";
        }

        setBarData([Math.round(totalPowerLossCost), Math.round(totalFiberLossCost), Math.round(totalLoss)]);

        return {
            val1: totalPowerLossCost,
            val2: totalFiberLossCost,
            val3: totalLoss,
            height1,
            height2,
            height3,
            thumbColor,
            fiberLoss
        };
    }, [
        currentRunningHours,
        rotorLifetime,
        fiberCost,
        lineCapacity,
        dailyRunningHours,
        lossRangeA,
        lossRangeB,
        lossRangeC,
        lossRangeD,
        installedMotorPower,
        consumptionGoodRotor,
        consumptionWornRotor,
        powerCost
    ]);

    const handleSideBarView = useCallback(() => {
        setShowSideBar(!showSideBar);
    }, [showSideBar]);

    const sendEmail = useCallback(async () => {
        try {
            setIsModalOpen(true);
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'jranjan2016@gmail.com',
                    subject: 'Schedule Maintenance | Kadant Lamort x Aryan Paper Mills',
                    htmlContent: EmailTemplate()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const result = await response.json();
            console.log('Email sent successfully:', result);
        } catch (error) {
            console.error('Error sending email:', error);
            // You might want to show an error message to the user here
        }
    }, [])
    

    return (
        <>
            <div className={`container transition-all duration-300 ${!animateHeaderShow ? '-translate-y-[60px]' : 'translate-y-0'}`}>
                <div><NavigationBar /></div>
                <div className={`container flex flex-row w-full gap-4 mt-4 ${!animateHeaderShow ? 'h-[calc(100svh_-_120px)]' : 'h-[calc(100svh_-_200px)]'} transition-all duration-300`}>
                    <div className="flex-grow-0">
                        <Sidebar data={data} setIsModalPDFOpen={setIsModalPDFOpen} lineCapacity={lineCapacity} dailyRunningHours={dailyRunningHours} lifetimeOfRotor={rotorLifetime} totalRunningHours={currentRunningHours} fiberLoss={chartData.fiberLoss} fiberCost={fiberCost} totalFiberLossCost={chartData?.val2} installedMotorPower={installedMotorPower} powerCost={powerCost} totalPowerLossCost={chartData?.val1} totalLossCost={barData?.[2]} handleSideBarView={handleSideBarView} showSideBar={showSideBar} />
                    </div>
                    <div className="flex-grow">
                        <MainContent sendEmail={sendEmail} data={data} barData={barData} resetChartData={resetChartData} currentRunningHours={currentRunningHours} setCurrentRunningHours={setCurrentRunningHours} installedOn={installedOn} rotorLifetime={rotorLifetime} chartData={chartData} />
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="space-y-4">
                    <div className="flex justify-end items-center cursor-pointer">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <Image src="mail.svg" alt="Mail icon" width={200} height={70} className="w-[60%] h-auto mx-auto" />
                    </div>
                    <h2 className="text-[#2d3e5c] text-3xl font-bold text-center font-lato">Schedule Maintenance</h2>
                    <div className="space-y-4">
                        {/* Add your modal content here */}
                        <p className="text-gray-600 text-center">We have notified the operations team Thank you, Team Kadant</p>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isModalPDFOpen} onClose={() => setIsModalPDFOpen(false)}>
                <div className="h-[90svh] overflow-y-scroll w-max thin-scroll">
                    <div className="flex justify-end items-center cursor-pointer">
                        <button
                            onClick={() => setIsModalPDFOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <RoiReport contentData={data} totalRunningHours={currentRunningHours} />
                </div>
            </Modal>
        </>
    )
}

export default Costcompt;