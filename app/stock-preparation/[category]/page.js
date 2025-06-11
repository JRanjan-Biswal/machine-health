'use client';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';

// ComponentCard Component
const ComponentCard = ({ sparePart }) => {

    const getSparePartColor = (sparePartData) => {
        if (sparePartData.clientMachineSparePart) {
            if (sparePartData.clientMachineSparePart.totalRunningHours?.value > sparePartData.lifeTime?.value) {
                return 'text-[#e86060] border-[#e86060]';
            } else if (sparePartData.clientMachineSparePart.totalRunningHours?.value == sparePartData.lifeTime?.value) {
                return 'text-[#ff9a00] border-[#ff9a00]';
            } else {
                return 'text-[#00a82d] border-[#00a82d]';
            }
        }
    }

    const getSparePartStatus = (sparePartData) => {
        if (sparePartData.clientMachineSparePart) {
            return sparePartData.clientMachineSparePart.totalRunningHours?.value > sparePartData.lifeTime?.value ? 'Attention' : sparePartData.clientMachineSparePart.totalRunningHours?.value == sparePartData.lifeTime?.value ? 'Monitor' : 'Healthy';
        }
    }

    return (
        <div className="flex flex-col w-full gap-1 font-lato">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex">
                    <h2 className="text-white text-lg font-semibold">{sparePart.name}</h2>
                </div>
                <Link href="/stock-preparation/hydrapuler/rotor">
                    <button className="flex items-center gap-2 text-[#96a5ba] hover:text-white transition-colors">
                        <span className="text-sm font-semibold">Show Detail</span>
                        <Image src="/icon-arr.png" alt="arrow" className="w-5 h-5" height={24} width={24} />
                    </button>
                </Link>
            </div>

            <div className="bg-[#374967] rounded-md p-[14px] w-full">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className={`w-full border rounded-md ${getSparePartColor(sparePart)} flex items-center justify-center`}>
                        <div className={`text-base pb-0.5 font-semibold text-center flex items-center justify-center ${getSparePartColor(sparePart)}`}>
                            Status - {getSparePartStatus(sparePart)}
                        </div>
                    </div>

                    <div className="w-full p-2 bg-[#2d3d5b] rounded-md">
                        <p className="text-[#dfe6ec] text-base text-center">
                            Installed On - {sparePart.clientMachineSparePart?.machineData?.installationDate ? new Date(sparePart.clientMachineSparePart?.machineData?.installationDate).toLocaleDateString('en-GB') : 'NIL'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// page Component
const page = () => {
    const [spareParts, setSpareParts] = React.useState([]);
    const [sparePartData, setSparePartData] = React.useState(null);

    const fetchSparePart = async () => {
        const response = await fetch('/api/sparepart');
        const data = await response.json();
        setSpareParts(data.data);
    }

    useEffect(() => {
        fetchSparePart();
    }, []);

    return (
        <div className='flex justify-between mt-6 mx-3 gap-4 container'>
            <div className='bg-white p-4 w-3/4 relative shadow-custom-2 rounded-xl h-fit'>
                <RotorStatus spareParts={spareParts} />
                {/* line */}
                <div className="absolute top-[140px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

                <div className='flex flex-wrap gap-4 mt-8'>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_170px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor</p>
                            <Image src="/rotor.png" width={300} height={300} alt='' className='object-contain transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_170px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor Hub</p>
                            <Image src="/rotor-hu-2.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_170px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Rotor Shaft</p>
                            <Image src="/rotor-hu-3.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                    <div className='bg-[#DFE6EC] rounded-lg w-[calc(50%_-_8px)] h-[calc(50svh_-_170px)] overflow-hidden group relative'>
                        <Link href="/stock-preparation/hydrapuler/rotor">
                            <p className='ps-4 pt-4 font-bold text-2xl font-lato'>Bedplate</p>
                            <Image src="/rotor-hu-4.png" width={300} height={300} alt='' className='object-cover transition-all duration-300 group-hover:scale-[1.02] mx-auto h-[calc(100%_-_50px)]' />
                            <button className='absolute cursor-pointer bottom-[15%] text-base font-bold font-lato text-primary-blue transition-all duration-300 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full bg-white px-4 py-2'>View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/4 bg-[#2d3e5c] rounded-[12px] pb-4 overflow-hidden shadow-custom-2 relative">
                <div className="flex flex-col items-center w-full bg-[#2d3e5c] px-4">
                    <h1 className="font-lato font-bold text-xl text-white text-center py-3">Key Components Status</h1>
                </div>
                <div className="w-full h-[1px] bg-[#607797]"></div>
                <div className=" px-4 flex flex-col justify-between w-full pe-2 py-4 h-[calc(100svh_-_280px)] overflow-scroll scroll-hide">
                    {spareParts.map((sparePart) => (
                        <ComponentCard key={sparePart._id} sparePart={sparePart} />
                    ))}
                </div>
                <div className="w-full h-[1px] bg-[#607797]"></div>
                <div className='w-full px-4 pt-4'>
                    <Link href="/stock-preparation/hydrapuler/rotor" className='w-full cursor-pointer'>
                        <button className="group flex flex-row items-center justify-center gap-5 py-2 bg-[#bf1e21] rounded-[50px] w-full hover:bg-[#a11a1c] transition-colors duration-200">
                            <Image src="/icon-gea.png" alt="Details icon" className="w-6 h-6 transition-all duration-300 group-hover:rotate-90" height={24} width={24} />
                            <span className="text-white font-montserrat font-bold text-base leading-6">View Details</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
