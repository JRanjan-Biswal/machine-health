
'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
import gradient from 'chartjs-plugin-gradient';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, gradient, ChartDataLabels);

import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';


const updateThumbColor = (element, value) => {
    let color;
    const normalizedValue = value / 100;

    if (normalizedValue >= 0 && normalizedValue < 0.25) {
        color = 'hsl(120, 100%, 20%)'; // Darker green
    } else if (normalizedValue >= 0.25 && normalizedValue < 0.5) {
        color = 'hsl(120, 100%, 40%)'; // Standard green
    } else if (normalizedValue >= 0.5 && normalizedValue < 0.75) {
        color = 'hsl(30, 100%, 50%)'; // Orange
    } else {
        color = 'hsl(0, 100%, 50%)'; // Red
    }

    // Set the CSS variable on the slider element
    element.style.setProperty('--slider-thumb-color', color);
};

const MainContent = () => {

    const chartRef = useRef(null);
    const [sliderValue, setSliderValue] = useState(49);

    const data = {
        labels: ['Power Loss', 'Fiber Loss', 'Total Loss'],
        datasets: [
            {
                label: 'Loss (%)',
                data: [12.5, 2.5, 12],
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!ctx || !chartArea) {
                        return null;
                    }

                    const { element } = context;
                    let gradientFill;

                    if (element && element.base && element.height) {
                        gradientFill = ctx.createLinearGradient(0, element.base, 0, element.base - element.height);
                    } else {
                        gradientFill = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    }

                    switch (context.dataIndex) {
                        case 0:
                            gradientFill.addColorStop(0, '#BF1E21');
                            gradientFill.addColorStop(1, '#EB5154');
                            break;
                        case 1:
                            gradientFill.addColorStop(0, '#FF9A00');
                            gradientFill.addColorStop(1, '#FFB647');
                            break;
                        case 2:
                            gradientFill.addColorStop(0, '#2D3E5C');
                            gradientFill.addColorStop(1, '#415E91');
                            break;
                        default:
                            gradientFill.addColorStop(0, 'rgba(211, 211, 211, 0.8)');
                            gradientFill.addColorStop(1, 'rgba(128, 128, 128, 0.8)');
                    }
                    return gradientFill;
                },
                borderColor: [
                    'rgba(191, 30, 33, 1)',
                    'rgba(255, 154, 0, 1)',
                    'rgba(45, 62, 92, 1)'
                ],
                borderWidth: 1,
                borderRadius: 5
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            // gradient: true, // Enable the plugin
            legend: {
                display: false // Remove legend if desired
            },
            datalabels: { // Datalabels plugin configuration
                anchor: 'end', // Position the label at the end of the bar (top for vertical)
                align: 'end',   // Align the label to the end (top for vertical)
                offset: 0,      // Offset from the end of the bar
                formatter: (value) => {
                    return value + ' %'; // Display the value and add " units"
                },
                font: {
                    weight: 'bold',
                    size: 16,
                },
                color: '#333', // Darker color for better contrast
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false // Keep labels
                },
                border: {
                    color: '#96A5BA', // Y-axis line color
                    width: 2 // Y-axis line width
                },
                title: {
                    display: true,
                    text: 'Cost',
                    color: '#96A5BA',
                    rotate: '180',
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    color: '#96A5BA', // Y-axis line color
                    width: 2 // Y-axis line width
                },
            }
        },
    };


    // useEffect to handle the initial color setting and subsequent changes
    useMemo(() => {
        if (typeof window === 'undefined') return; // Ensure this runs only in the browser

        const sliderElement = document.getElementById('slider-1');
        if (sliderElement) {
            updateThumbColor(sliderElement, sliderValue);
        }
    }, [sliderValue]); // Re-run when sliderValue changes

    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setSliderValue(newValue);
    };

    return (
        <div className="w-full mx-auto bg-white rounded-xl border border-[#dfe6ec] overflow-hidden h-[calc(100svh_-_200px)]">
            {/* Header */}
            <div className="flex flex-col gap-x-2 bg-secondary-blue relative">
                <div className="bg-[#2d3e5c] rounded-t-xl px-5 py-1 w-fit">
                    <h1 className="text-white font-lato text-base">Spare Parts Analysis (Hydrapulper)</h1>
                </div>

                <div className="flex flex-row items-center w-full border-b border-[#96a5ba]">
                    <div className="flex items-end-safe gap-1 p-2.5">
                        <span className="text-[#d45815] font-montserrat font-bold ps-4">Rotor</span>
                        <RiArrowRightSLine size={24} />
                    </div>
                    <div className="flex items-end-safe gap-1 p-2.5">
                        <span className="text-[#2d3e5c] font-montserrat font-bold">Rotor Shaft</span>
                        <RiArrowRightSLine size={24} />
                    </div>
                    <div className="flex items-end-safe gap-1 p-2.5">
                        <span className="text-[#2d3e5c] font-montserrat font-bold">Rotor hub</span>
                        <RiArrowRightSLine size={24} />
                    </div>
                    <div className="flex items-end-safe gap-1 p-2.5">
                        <span className="text-[#2d3e5c] font-montserrat font-bold">BedPlate</span>
                        <RiArrowRightSLine size={24} />
                    </div>
                </div>

                {/* Schedule Maintenance Button */}
                <div className="flex justify-end mt-4 absolute right-4">
                    <button className="flex items-center gap-2 bg-[#2d3e5c] text-white px-8 py-3 rounded-[50px]">
                        <Image src="/icon-gea.png" width={24} height={24} alt="Gear icon" />
                        <span className="font-montserrat font-bold">Schedule Maintenance</span>
                    </button>
                </div>
            </div>

            <div className='px-4 relative'>

                <div className='flex gap-5 absolute top-4 left-8'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-5 w-5 rounded-sm' style={{ 'background': 'linear-gradient(270deg, #EB5154 0%, #BF1E21 100%)' }} />
                        <p>Power loss (%)</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-5 w-5 rounded-sm' style={{ 'background': 'linear-gradient(270deg, #FFB647 0%, #FF9A00 100%)' }} />
                        <p>Fiber loss (%)</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-5 w-5 rounded-sm' style={{ 'background': 'linear-gradient(270deg, #415E91 0%, #2D3E5C 100%)' }} />
                        <p>Total loss</p>
                    </div>
                </div>

                {/* Loss Stats Box */}
                <div className="bg-[#e6eef5] rounded-md border border-[#cad9ed] mt-4 w-full max-w-[361px] ml-auto">
                    <div className="flex justify-center flex-col items-center py-4">
                        <div className="text-[28px] font-bold text-[#ae2d2d]">€ 24,880</div>
                        <div className="text-base text-[#ae2d2d]">Total Loss</div>
                    </div>
                    <div className="border-t border-[#cad9ed]">
                        <div className="flex justify-between relative px-4">
                            <div className="flex flex-col py-4 w-1/2">
                                <span className="text-[#2d3e5c] font-bold text-xl text-center">€ 18,400</span>
                                <span className="text-[#607797] text-center">Fiber Loss</span>
                            </div>
                            <div className='h-full w-[1px] absolute left-1/2 top-0 bottom-0 bg-[#cad9ed]' />
                            <div className="border-[#cad9ed] flex flex-col py-4 w-1/2">
                                <span className="text-[#2d3e5c] font-bold text-xl text-center">€ 6,480</span>
                                <span className="text-[#607797] text-center">Power Loss</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="mt-8 w-[calc(100%_-_350px)] h-[calc(50svh_-_220px)]">
                    <Bar ref={chartRef} data={data} options={options} id='chart' />
                </div>

                {/* Timeline */}
                <div className="mt-12 mx-auto">
                    <div className="relative custom-range mx-auto">
                        <div className='first' />
                        <div className='second' />
                        <div className='third' />
                        <div className='slider-color'></div>
                        <input type="range" min="0" max="100" id="slider-1"  onChange={handleSliderChange} value={sliderValue} />
                    </div>
                    <div className="flex justify-between mt-4 text-[#2d3e5c] font-bold w-[70%] mx-auto shadow-custom-1">
                        <div className="text-center">
                            <p>Installed On</p>
                            <p>(17/08/2024)</p>
                        </div>
                        <div className="text-center">
                            <p>Lifespan</p>
                            <p>(3600 Hrs)</p>
                        </div>
                        <div className="text-center">
                            <p>Current running hours</p>
                            <p>(5040 Hrs)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;