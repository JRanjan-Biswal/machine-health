'use client'
import Image from 'next/image';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
import { Bar } from 'react-chartjs-2';
import gradient from 'chartjs-plugin-gradient';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, gradient);

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

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

const MainContent = () => {

    const data = {
        labels: ['Power Loss', 'Fiber Loss', 'Total Loss'],
        datasets: [
            {
                label: 'Loss (%)',
                data: [12.5, 2.5, 12],
                backgroundColor: [
                    'rgba(235, 81, 84, 0.8)',
                    'rgba(255, 182, 71, 0.8)',
                    'rgba(65, 94, 145, 0.8)'
                ],
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

    // function updateSlider() {
    //     const slider = document.getElementById("slider-1");
    //     const fill = document.getElementById("fill-1");
    //     const remaining = document.getElementById('remaining-1');

    //     function update() {
    //         const value = slider.value;
    //         const percentage = (value / slider.max) * 100;

    //         fill.style.width = percentage + '%';
    //         remaining.style.width = (100 - percentage) + '%';
    //     }



    //     // Initial update
    //     update();
    // }

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
                    <div className="flex justify-center items-center gap-4 py-4">
                        <span className="text-[28px] font-bold text-[#ae2d2d]">€ 24,880</span>
                        <span className="text-base text-[#ae2d2d]">Total Loss</span>
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
                <div className="mt-8 w-[calc(100%_-_400px)] h-[260px]">
                    <Bar data={data} options={options} id='chart' />
                </div>

                {/* Timeline */}
                <div className="mt-16 mx-auto">
                    <div className="relative custom-range mx-auto">
                        <div className='first'/>
                        <div className='second'/>
                        <div className='third'/>
                        <div className='slider-color'></div>
                        {/* <div class="slider-background">
                            <div className="slider-fill" id="fill-1"></div>
                            <div className="slider-remaining" id="remaining-1"></div>
                        </div> */}
                        <input type="range" min="0" max="100" id="slider-1" />
                        {/* <div className="w-full h-5 bg-gradient-to-r from-[#e5eacc] via-[#f4eac4] to-[#ffd3c4] rounded-full"></div>
                        <Image src="/capa-1.png" width={64} height={64} alt="Timeline marker" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" /> */}
                    </div>
                    <div className="flex justify-between mt-4 text-[#2d3e5c] font-bold w-[70%] mx-auto">
                        <div className="text-center">
                            <p>Installed On</p>
                            <p>(17/08/2024)</p>
                        </div>
                        <div className="text-center">
                            <p>Lifespan (3600 Hrs)</p>
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


const NavigationBar = ({ activeTab = 'pulping', onTabChange = () => { } }) => {
    const navigationItems = [
        { id: 'stock', label: 'Stock Preparation', isHeader: true },
        { id: 'pulping', label: 'Pulping & Detrashing' },
        { id: 'cleaning', label: 'Cleaning' },
        { id: 'screening', label: 'Screening' },
        { id: 'thickening', label: 'Thickening' },
        { id: 'deinking', label: 'Deinking' },
        { id: 'refining', label: 'Refining & Dispersing' },
        { id: 'water', label: 'Water Clarifier' },
    ];

    return (
        <div className="flex items-center h-10 font-montserrat mt-2">
            {/* Stock Preparation Header */}
            <div className="flex items-center h-[38px] px-5 py-[7px] bg-[#f9f9f9] border-r-2 border-[#607797]">
                <span className="text-[#607797] text-base font-medium leading-6">
                    Stock Preparation
                </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center h-[38px]">
                {navigationItems.slice(1).map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center px-5 py-[10px] hover:bg-[#f5f7f9] transition-colors
              ${activeTab === item.id ? 'bg-[#f5f7f9]' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <span className="text-[#2d3e5c] text-base font-bold leading-[18px]">
                            {item.label}
                        </span>
                    </Link>
                ))}

                {/* Icon Button */}
                <button className="flex items-center justify-center w-[34px] h-[34px] ml-1 rounded-full bg-[#dfe6ec] hover:bg-[#d0dae3] transition-colors">
                    <Image
                        src="/icon.png"
                        alt="Navigation Icon"
                        width={24}
                        height={24}
                        className="p-[5px]"
                    />
                </button>
            </div>
        </div>
    );
};


const Layout = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const handleSideBarView = useCallback(() => {
        setShowSideBar(!showSideBar);
        console.log(showSideBar)
    }, [showSideBar])

    return (
        <div className="container transition-all duration-300">
            <div><NavigationBar /></div>
            <div className="flex flex-row w-full gap-4 mt-4 h-[calc(100svh_-_200px)]">
                <div className="flex-grow-0">
                    <Sidebar handleSideBarView={handleSideBarView} showSideBar={showSideBar} />
                </div>
                <div className="flex-grow"
                    style={{ width: showSideBar ? 'calc(100% - 334px)' : 'calc(100% - 50px)' }}
                >
                    <MainContent />
                </div>
            </div>
        </div>
    )
}

export default Layout;