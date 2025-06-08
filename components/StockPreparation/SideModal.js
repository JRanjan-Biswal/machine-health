'use client';
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const componentData = [
    {
        name: 'Rotor',
        status: 'Attention',
        image: '/rotor.png',
        icon: '/icon-rem.png',
        color: 'text-red-500',
        href:'/stock-preparation/hydrapulper/rotor'
    },
    {
        name: 'Rotor Hub',
        status: 'Healthy',
        image: '/rotor-hu-2.png',
        icon: '/icon-rem-2.png',
        color: 'text-green-500',
        href:'/#'
    },
    {
        name: 'Rotor Shaft',
        status: 'Healthy',
        image: '/rotor-hu-3.png',
        icon: '/icon-rem-2.png',
        color: 'text-green-500',
        href:'/#'
    },
    {
        name: 'BedPlate',
        status: 'Monitor',
        image: '/rotor-hu-4.png',
        icon: '/yellow-bell.png',
        color: 'text-yellow-500',
        href:'/#'
    }
];
const SideModal = ({ handleClick, showSideBar }) => {
    const router = useRouter()
    const swiperRef = useRef(null);

    const [showSummary, setShowSummary] = useState(false);
    const handleProductSummaryClick = () => setShowSummary(!showSummary);

    const handleExploreNow = () => router.push('/stock-preparation/hydrapuler')

    return (
        <div className={`fixed top-4 right-4 h-[calc(100svh_-_16px) transition-all duration-300 ${!showSideBar ? 'translate-x-[calc(100%_+_100px)]' : 'translate-x-0'}`}>
            <div className="flex flex-col bg-[#2d3e5c] rounded-lg w-[413px]">
                {/* Header Section */}
                <div className="flex justify-between items-center px-4 pt-4">
                    {/* Header Section */}
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-2xl font-bold text-white">HydrapulperTM</h1>
                        <button className="cursor-pointer" onClick={handleClick}><RxCross2 size={20} color="white" /></button>
                    </div>
                </div>

                {/* Product Summary Section */}
                <div className="flex flex-col items-center p-4">
                    {/* Product Summary Section */}
                    <div className="bg-[#364662] rounded-xl w-full relative mb-4">
                        <div className="flex justify-between mb-4 absolute top-1/2 w-full -translate-y-1/2 z-10">
                            <Image src="/icon.png" alt="Left Icon" width={24} height={24} onClick={() => swiperRef?.current?.slidePrev()} className="cursor-pointer" />
                            <Image src="/icon-2.png" alt="Right Icon" width={24} height={24} onClick={() => swiperRef?.current?.slideNext()} className="cursor-pointer" />
                        </div>
                        <div className="relative h-[200px] flex item-center">
                            <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)} loop>
                                <SwiperSlide>
                                    <Image src="/slider-1.png" alt="Product" objectFit="contain" height={300} width={300} className="h-full w-full object-contain" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/slider-2.png" alt="Product" objectFit="contain" height={300} width={300} className="h-full w-full object-contain" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src="/slider-3.png" alt="Product" objectFit="contain" height={300} width={300} className="h-full w-full object-contain" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className={`w-full absolute bottom-0 z-10 cursor-pointer flex items-center justify-between bg-white/80 backdrop-blur-sm ${showSummary ? 'rounded-lg' : 'rounded-full'} px-4 py-2 hover:bg-white transition-colors oveflow-hidden`}>
                            <div className="text-[#2d3e5c] font-semibold w-full">

                                <div className="flex justify-between items-center w-full" onClick={handleProductSummaryClick}>
                                    <p>Product Summary</p>
                                    <Image src="/icon-3.png" alt="Arrow" width={24} height={24} className={`${showSummary ? 'rotate-180' : 'rotate-0'}`} />
                                </div>

                                <div className={`${showSummary ? 'block' : 'hidden'}`}>
                                    <div className="mb-4 font-extralight mt-2">
                                        The Hydrapulper is responsible for breaking down and dispersing pulp in your stock preparation line.
                                    </div>
                                    <div className="flex w-full gap-2 mb-2">
                                        <div className="w-1/2 bg-[#DFE6EC] rounded-lg py-2">
                                            <p className="font-extralight text-[14px] text-center">Installation Date</p>
                                            <p className="font-medium text-center">17-Aug-2024</p>
                                        </div>
                                        <div className="w-1/2 bg-[#DFE6EC] rounded-lg py-2">
                                            <p className="text-center font-extralight text-[14px]">Installation Date</p>
                                            <p className="text-center text-orange-400 font-medium">10-Dec-2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Components Status Section */}
                <div className="flex flex-col p-4">
                    {/* Components Status Section */}
                    <div className="h-[calc(100%_-_400px)]">
                        <h2 className="text-xl font-semibold text-white mb-4">Components Status</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {componentData.map((component, index) => (
                                <Link key={index} href={component.href} className="bg-[#26334b] rounded-xl h-[181px] relative cursor-pointer">
                                    <div className="bg-[#13213a] rounded-t-xl flex items-center justify-center gap-2 py-1 px-4 mb-4">
                                        <Image src={component.icon} alt="Status Icon" width={16} height={16} />
                                        <div className={`font-semibold ${component.color}`}>{component.status}</div>
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <Image src={component.image} alt={component.name} width={120} height={110} className="h-[60%] w-[60%]" />
                                    </div>
                                    <p className="text-white font-bold text-center absolute bottom-2 left-1/2 -translate-x-1/2">{component.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Explore Now Section */}
                <div className="flex justify-center items-center p-4">
                    <button
                        className="flex flex-row items-center justify-center gap-2 px-8 py-3 bg-[#d45815] rounded-full min-w-[203px] h-12 hover:bg-[#c24d10] transition-colors duration-200 cursor-pointer"
                    onClick={handleExploreNow}
                    >
                        <span className="text-white font-bold text-base font-montserrat">
                            Explore Now
                        </span>
                        <Image
                            src="/icon-arr.png"
                            alt="Arrow Icon"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideModal;

