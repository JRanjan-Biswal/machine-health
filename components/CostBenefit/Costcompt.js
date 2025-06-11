'use client'
import { useCallback, useMemo, useState } from 'react';
import NavigationBar from '@/components/CostBenefit/Navigationbar';
import Sidebar from '@/components/CostBenefit/Sidebar';
import MainContent from '@/components/CostBenefit/MainContent';

const Costcompt = ({ data }) => {
    const [showSideBar, setShowSideBar] = useState(false);

    const [currentRunningHours, setCurrentRunningHours] = useState(data?.clientMachineSparePart?.totalRunningHours?.value);
    const [installedOn, setInstalledOn] = useState(data?.clientMachineSparePart?.machineData?.installationDate);
    const [barData, setBarData] = useState(null);

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
    }, [showSideBar])

    return (
        <div className="container transition-all duration-300">
            <div><NavigationBar /></div>
            <div className="flex flex-row w-full gap-4 mt-4 h-[calc(100svh_-_200px)]">
                <div className="flex-grow-0">
                    <Sidebar data={data} lineCapacity={lineCapacity} dailyRunningHours={dailyRunningHours} lifetimeOfRotor={rotorLifetime} totalRunningHours={currentRunningHours} fiberLoss={chartData.fiberLoss} fiberCost={fiberCost} totalFiberLossCost={chartData?.val2} installedMotorPower={installedMotorPower} powerCost={powerCost} totalPowerLossCost={chartData?.val1} totalLossCost={barData?.[2]}  handleSideBarView={handleSideBarView} showSideBar={showSideBar} />
                </div>
                <div className="flex-grow"
                    style={{ width: showSideBar ? 'calc(100% - 334px)' : 'calc(100% - 50px)' }}
                >
                    <MainContent data={data} barData={barData} currentRunningHours={currentRunningHours} setCurrentRunningHours={setCurrentRunningHours} installedOn={installedOn} rotorLifetime={rotorLifetime} chartData={chartData} />
                </div>
            </div>
        </div>
    )
}

export default Costcompt;