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
import { useHeader } from '@/context/HeaderContext';


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


const MainContent = ({ data, barData, resetChartData, currentRunningHours, setCurrentRunningHours, installedOn, rotorLifetime, chartData, sendEmail }) => {
    const chartRef = useRef(null);
    const { animateHeaderShow } = useHeader();


    return (
        <div className={`w-full mx-auto bg-white rounded-xl border border-[#dfe6ec] overflow-hidden ${!animateHeaderShow ? 'h-[calc(100svh_-_120px)]' : 'h-[calc(100svh_-_200px)]'} shadow-custom-1 transition-all duration-300`} style={{ "--slider-thumb-color": chartData.thumbColor }}>
            <Header sendEmail={sendEmail} />
            <div className='px-4 relative h-[calc(100%_-_77px)]'>
                <ChartLegend />
                <StatsBox contentData={data} barData={barData} />
                <CostChart barData={barData} chartRef={chartRef} />
                <Timeline
                    currentRunningHours={currentRunningHours}
                    setCurrentRunningHours={setCurrentRunningHours}
                    installedOn={installedOn}
                    lifespan={rotorLifetime}
                    resetChartData={resetChartData}
                />
            </div>
        </div>
    );
};

export default MainContent;