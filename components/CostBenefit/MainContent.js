
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
import gradient from 'chartjs-plugin-gradient';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, gradient);

import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';

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

export default MainContent;