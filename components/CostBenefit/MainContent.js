'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
import gradient from 'chartjs-plugin-gradient';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, gradient, ChartDataLabels);

import { useMemo, useRef, useState } from 'react';
import "@/app/styles/slider.css";
import Header from './HeaderContent';
import ChartLegend from './Legend';
import StatsBox from './StatBox';
import CostChart from './CostChart';
import Timeline from './Timeline';


// const updateThumbColor = (element, value) => {
//     let color;
//     const normalizedValue = value / 100;

//     if (normalizedValue >= 0 && normalizedValue < 0.25) {
//         color = 'hsl(120, 100%, 20%)'; // Darker green
//     } else if (normalizedValue >= 0.25 && normalizedValue < 0.5) {
//         color = 'hsl(120, 100%, 40%)'; // Standard green
//     } else if (normalizedValue >= 0.5 && normalizedValue < 0.75) {
//         color = 'hsl(30, 100%, 50%)'; // Orange
//     } else {
//         color = 'hsl(0, 100%, 50%)'; // Red
//     }

//     // Set the CSS variable on the slider element
//     element.style.setProperty('--slider-thumb-color', color);
// };


const MainContent = ({ contentData }) => {
    const chartRef = useRef(null);
    const [currentRunningHours, setCurrentRunningHours] = useState(contentData?.clientMachineSparePart?.totalRunningHours?.value);
    const [installedOn, setInstalledOn] = useState(contentData?.clientMachineSparePart?.machineData?.installationDate);
    const [barData, setBarData] = useState(null);

    // --- General & Fiber Loss Inputs ---
    const [fiberCost, setFiberCost] = useState(contentData?.clientMachineSparePart?.fiberCost?.value);
    const [rotorLifetime, setRotorLifetime] = useState(contentData?.clientMachineSparePart?.lifetimeOfRotor?.value);
    const [lineCapacity, setLineCapacity] = useState(contentData?.clientMachineSparePart?.capacityOfLine?.value); // TPD
    const [dailyRunningHours, setDailyRunningHours] = useState(contentData?.clientMachineSparePart?.dailyRunningHours?.value);
    const [lossRangeA, setLossRangeA] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[0]?.value);
    const [lossRangeB, setLossRangeB] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[1]?.value);
    const [lossRangeC, setLossRangeC] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[2]?.value);
    const [lossRangeD, setLossRangeD] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[3]?.value);

    // --- State for Power Loss Inputs ---
    const [installedMotorPower, setInstalledMotorPower] = useState(contentData?.clientMachineSparePart?.installedMotorPower?.value);
    const [consumptionGoodRotor, setConsumptionGoodRotor] = useState(contentData?.clientMachineSparePart?.actualMotorPowerConsumption?.healthy?.value);
    const [consumptionWornRotor, setConsumptionWornRotor] = useState(contentData?.clientMachineSparePart?.actualMotorPowerConsumption?.wornout?.value);
    const [powerCost, setPowerCost] = useState(contentData?.clientMachineSparePart?.powerCost?.value);

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
        powerCost,
    ]);

    return (
        <div className="w-full mx-auto bg-white rounded-xl border border-[#dfe6ec] overflow-hidden h-[calc(100svh_-_200px)] shadow-custom-1" style={{ "--slider-thumb-color": chartData.thumbColor }}>
            <Header />
            <div className='px-4 relative h-[calc(100%_-_77px)]'>
                <ChartLegend />
                <StatsBox contentData={contentData} />
                <CostChart barData={barData} chartRef={chartRef} />
                <Timeline
                    currentRunningHours={currentRunningHours}
                    setCurrentRunningHours={setCurrentRunningHours}
                    installedOn={installedOn}
                    lifespan={rotorLifetime}
                />
            </div>
        </div>
    );
};

export default MainContent;