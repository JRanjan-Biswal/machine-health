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
        <div className="flex flex-col w-full gap-2 ">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex">
                    <h2 className="text-white text-xl font-semibold">{title}</h2>
                </div>
                <button className="flex items-center gap-2 text-[#96a5ba] hover:text-white transition-colors">
                    <span className="text-sm font-semibold">Show Detail</span>
                    <Image src="/icon-arr.png" alt="arrow" className="w-5 h-5" height={24} width={24} />
                </button>
            </div>

            <div className="bg-[#374967] rounded-md p-4 w-full">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className={`w-full p-2 border rounded-md ${getStatusColor(status)}`}>
                        <p className={`text-base font-semibold text-center ${getStatusColor(status)}`}>
                            Status - {status}
                        </p>
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


// Layout Component
const Layout = () => {
    return (
        <div className='flex justify-between mt-6 mx-3 gap-4 container'>
            <div className='bg-white p-4 w-3/4'>
                <RotorStatus />

                <div className='flex flex-wrap gap-4 h-[calc(100%_-_140px)] mt-4'>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_160px)]'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl'>Rotor</p>
                            <Image src="/rotor.png" width={300} height={300} alt='' className='object-cover mx-auto h-[calc(100%_-_50px)]' />
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_160px)]'>
                        <p className='ps-4 pt-4 font-bold text-2xl'>Rotor Hub</p>
                        <Image src="/rotor-hu-2.png" width={300} height={300} alt='' className='object-cover mx-auto h-[calc(100%_-_50px)]' />
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_160px)]'>
                        <p className='ps-4 pt-4 font-bold text-2xl'>Rotor Shaft</p>
                        <Image src="/rotor-hu-3.png" width={300} height={300} alt='' className='object-cover mx-auto h-[calc(100%_-_50px)]' />
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_160px)]'>
                        <p className='ps-4 pt-4 font-bold text-2xl'>Bedplate</p>
                        <Image src="/rotor-hu-4.png" width={300} height={300} alt='' className='object-cover mx-auto h-[calc(100%_-_50px)]' />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/4 bg-[#2d3e5c] rounded-[12px] py-5 ps-5 pe-2">
                <div className="flex flex-col items-center w-full bg-[#2d3e5c]">
                    <h1 className="font-lato font-bold text-xl text-white text-center py-2">
                        Key Components Status
                    </h1>
                    <div className="w-full h-[1px] bg-[#607797]"></div>
                </div>
                <div className="flex flex-col gap-5 w-full h-[calc(100svh_-_320px)] overflow-scroll pe-2 py-4">
                    <ComponentCard title="Rotor" status="Attention" installDate="17 AUG 2024" />
                    <ComponentCard title="Rotor Hub" status="Healthy" installDate="17 AUG 2024" />
                    <ComponentCard title="Rotor Shaft" status="Healthy" installDate="17 AUG 2024" />
                    <ComponentCard title="Bedplate" status="Monitor" installDate="17 AUG 2024" />
                </div>
                <button
                    // onClick={onClick}
                    className="flex flex-row items-center justify-center gap-5 px-9 py-4 bg-[#bf1e21] rounded-[50px] w-full hover:bg-[#a11a1c] transition-colors duration-200"
                >
                    <Image
                        src="/icon-gea.png"
                        alt="Details icon"
                        className="w-6 h-6"
                        height={24}
                        width={24}
                    />
                    <span className="text-white font-montserrat font-bold text-base leading-6">
                        View Details
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Layout;
