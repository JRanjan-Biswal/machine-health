'use client';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// ComponentCard Component
const ComponentCard = ({ title = 'Rotor', status = 'Attention', installDate = '17 AUG 2024' }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'healthy':
                return 'text-[#00a82d] border-[#00a82d]';
            case 'attention':
                return 'text-[#e86060] border-[#e86060]';
            case 'monitor':
                return 'text-[#ff9a00] border-[#ff9a00]';
            default:
                return 'text-[#e86060] border-[#e86060]';
        }
    };

    return (
        <div className="flex flex-col w-full gap-1 font-lato">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex">
                    <h2 className="text-white text-lg font-semibold">{title}</h2>
                </div>
                <button className="flex items-center gap-2 text-[#96a5ba] hover:text-white transition-colors">
                    <span className="text-sm font-semibold">Show Detail</span>
                    <Image src="/icon-arr.png" alt="arrow" className="w-5 h-5" height={24} width={24} />
                </button>
            </div>

            <div className="bg-[#374967] rounded-md p-4 w-full">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className={`w-full border rounded-md ${getStatusColor(status)} flex items-center justify-center`}>
                        <div className={`text-base pb-0.5 font-semibold text-center flex items-center justify-center ${getStatusColor(status)}`}>
                            Status - {status}
                        </div>
                    </div>

                    <div className="w-full p-2 bg-[#2d3d5b] rounded-md">
                        <p className="text-[#dfe6ec] text-base text-center">
                            Installed On - {installDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// page Component
const page = () => {
    return (
        <div className='flex justify-between mt-6 mx-3 gap-4 container'>
            <div className='bg-white p-4 w-3/4 relative shadow-custom-2 rounded-xl'>
                <RotorStatus />
                {/* line */}
                <div className="absolute top-[140px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

                <div className='flex flex-wrap gap-4 h-[calc(100%_-_140px)] mt-8'>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50%_-_10px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor</p>
                            <Image src="/rotor.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50%_-_10px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor Hub</p>
                            <Image src="/rotor-hu-2.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50%_-_10px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor Shaft</p>
                            <Image src="/rotor-hu-3.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50%_-_10px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Bedplate</p>
                            <Image src="/rotor-hu-4.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/4 bg-[#2d3e5c] rounded-[12px] pb-5 overflow-hidden shadow-custom-2">
                <div className="flex flex-col items-center w-full bg-[#2d3e5c]">
                    <h1 className="font-lato font-bold text-xl text-white text-center py-3">Key Components Status</h1>
                    <div className="w-full h-[1px] bg-[#607797]"></div>
                </div>
                <div className="flex flex-col gap-4 w-full overflow-scroll ps-5 pe-5 py-4">
                    
                </div>
                <div className='w-full px-4'>
                    <button className="group flex flex-row items-center justify-center gap-5 px-9 py-4 bg-[#bf1e21] rounded-[50px] w-full hover:bg-[#a11a1c] transition-colors duration-200">
                        <Image src="/icon-gea.png" alt="Details icon" className="w-6 h-6 transition-all duration-300 group-hover:rotate-90" height={24} width={24} />
                        <span className="text-white font-montserrat font-bold text-base leading-6">View Details</span>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default page;
