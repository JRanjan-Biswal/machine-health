'use client';
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper/modules';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const componentData = [
    {
        name: 'Rotor',
        status: 'Attention',
        image: '/rotor-1.png',
        icon: '/icon-rem.png',
        color: 'text-red-500',
        href: '/stock-preparation/hydrapulper/rotor'
    },
    {
        name: 'Rotor Hub',
        status: 'Healthy',
        image: '/rotor-hu-2.png',
        icon: '/icon-rem-2.png',
        color: 'text-green-500',
        href: '/#'
    },
    {
        name: 'Rotor Shaft',
        status: 'Healthy',
        image: '/rotor-hu-3.png',
        icon: '/icon-rem-2.png',
        color: 'text-green-500',
        href: '/#'
    },
    {
        name: 'BedPlate',
        status: 'Monitor',
        image: '/rotor-hu-4.png',
        icon: '/yellow-bell.png',
        color: 'text-yellow-500',
        href: '/#'
    }
];

const imageMap = {
    "684363cf58886bd63a211b24": "/rotor-1.png",
    "6845f978af4093194af7ee8d": "/rotor-hu-2.png",
    "6845f98faf4093194af7ee8e": "/rotor-hu-3.png",
    "6845f99daf4093194af7ee8f": "/rotor-hu-4.png",
}

const SideModal = ({ handleClick, showSideBar }) => {
    const router = useRouter()
    const swiperRef = useRef(null);
    const [spareParts, setSpareParts] = useState([]);
    const [sparePartData, setSparePartData] = useState([]);

    const fetchSpareParts = async () => {
        const response = await fetch('/api/sparepart');
        const data = await response.json();

        const filterData = data.data.filter(item => item._id == "684363cf58886bd63a211b24")?.[0];
        setSpareParts(data.data);
        setSparePartData(filterData);
        console.log(filterData.clientMachineSparePart?.machineData?.installationDate)
    }

    useEffect(() => {
        fetchSpareParts();
    }, []);

    const [showSummary, setShowSummary] = useState(false);

    const getSparePartColor = (sparePart) => {
        if (sparePart.clientMachineSparePart) {
            if (sparePart.clientMachineSparePart.totalRunningHours?.value > sparePart.lifeTime?.value) {
                return 'text-red-500';
            } else if (sparePart.clientMachineSparePart.totalRunningHours?.value == sparePart.lifeTime?.value) {
                return 'text-yellow-500';
            } else {
                return 'text-green-500';
            }
        }
    }

    const getSparePartStatus = (sparePart) => {
        if (sparePart.clientMachineSparePart) {
            if (sparePart.clientMachineSparePart.totalRunningHours?.value > sparePart.lifeTime?.value) {
                return 'Attention';
            } else if (sparePart.clientMachineSparePart.totalRunningHours?.value == sparePart.lifeTime?.value) {
                return 'Monitor';
            } else {
                return 'Healthy';
            }
        }
    }

    const getSparePartStatusIcon = (sparePart) => {
        if (sparePart.clientMachineSparePart) {
            if (sparePart.clientMachineSparePart.totalRunningHours?.value > sparePart.lifeTime?.value) {
                return '/icon-rem.png';
            } else if (sparePart.clientMachineSparePart.totalRunningHours?.value == sparePart.lifeTime?.value) {
                return '/yellow-bell.png';
            } else {
                return '/icon-rem-2.png';
            }
        }
    }

    const handleProductSummaryClick = () => setShowSummary(!showSummary);

    const handleExploreNow = () => router.push('/stock-preparation/hydrapuler');


    return (
        <div className={`fixed bottom-[10px] right-4 transition-all duration-300 ${!showSideBar ? 'translate-x-[calc(100%_+_100px)]' : 'translate-x-0'}`}>
            <div className="flex flex-col bg-[#2d3e5c] rounded-lg w-[413px]">
                {/* Header Section */}
                <div className="flex justify-between items-center px-4 pt-4">
                    {/* Header Section */}
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-xl font-bold text-white">HydrapulperTM</h1>
                        <button className="cursor-pointer" onClick={handleClick}><RxCross2 size={20} color="white" /></button>
                    </div>
                </div>

                {/* Product Summary Section */}
                <div className="flex flex-col items-center p-4">
                    {/* Product Summary Section */}
                    <div className="bg-[#364662] rounded-xl w-full relative">
                        <div className="flex justify-between mb-4 absolute top-1/2 w-full -translate-y-1/2 z-10">
                            <Image src="/icon.png" alt="Left Icon" width={24} height={24} onClick={() => swiperRef?.current?.slidePrev()} className="cursor-pointer" />
                            <Image src="/icon-2.png" alt="Right Icon" width={24} height={24} onClick={() => swiperRef?.current?.slideNext()} className="cursor-pointer" />
                        </div>
                        <div className="relative h-[calc(20svh)] flex item-center">
                            <Swiper
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                fadeEffect={{ crossFade: true }}
                                modules={[EffectFade]}
                                effect="fade"
                                loop
                            >
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
                        <div className={`w-full absolute -bottom-[18px] z-10 cursor-pointer flex items-center justify-between bg-[#DFE6ECBF] backdrop-blur-sm ${showSummary ? 'rounded-lg' : 'rounded-full'} px-4 py-2 oveflow-hidden`}>
                            <div className="text-primary-blue font-semibold w-full">

                                <div className="flex justify-between items-center w-full" onClick={handleProductSummaryClick}>
                                    <p className="font-semibold text-base">Product Summary</p>
                                    <Image src="/icon-3.png" alt="Arrow" width={24} height={24} className={`${showSummary ? 'rotate-180' : 'rotate-0'}`} />
                                </div>

                                <div className={`${showSummary ? 'block' : 'hidden'}`}>
                                    <div className="mb-4 font-medium leading-5 mt-2 text-[15px]">
                                        The Hydrapulper is responsible for breaking down and dispersing pulp in your stock preparation line.
                                    </div>
                                    <div className="flex w-full gap-2 mb-2">
                                        <div className="w-1/2 bg-[#DFE6EC] rounded-lg py-2">
                                            <p className="font-normal text-[14px] text-center">Installation Date</p>
                                            <p className="font-medium text-center">{sparePartData.clientMachineSparePart?.machineData?.installationDate ? new Date(sparePartData.clientMachineSparePart?.machineData?.installationDate).toLocaleDateString('en-GB') : null}</p>
                                        </div>
                                        <div className="w-1/2 bg-[#DFE6EC] rounded-lg py-2">
                                            <p className="text-center font-normal text-[14px]">Next Service</p>
                                            <p className="text-center text-orange-400 font-medium">21-Oct-2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Components Status Section */}
                <div className="flex flex-col px-4 pb-4 mt-4">
                    {/* Components Status Section */}
                    <div className="h-[calc(100%_-_400px)]">
                        <h2 className="text-[18px] font-semibold text-white mb-4">Components Status</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                spareParts.map((sparePart, index) => (
                                    <div key={index} className="bg-[#26334b] rounded-xl h-[17svh] relative cursor-pointer overflow-hidden">
                                        <div className="bg-[#13213a] rounded-t-xl flex items-center justify-center gap-2 py-1 px-4">
                                            <Image src={getSparePartStatusIcon(sparePart)} alt="Status Icon" width={16} height={16} />
                                            <div className={`font-semibold ${getSparePartColor(sparePart)}`}>{getSparePartStatus(sparePart)}</div>
                                        </div>
                                        <div className="relative group h-[calc(100%_-_28px)]">
                                            <div className="absolute inset-0 z-10 group-hover:backdrop-blur-sm ">
                                                <Link href={"/stock-preparation/hydrapulper/rotor"} className="bg-white text-primary-blue px-6 py-[3px] absolute left-1/2 top-[44%] -translate-1/2 rounded-4xl font-medium opacity-0 group-hover:opacity-100">explore</Link>
                                            </div>
                                            <div className="flex justify-center mb-4 h-[calc(100%_-_24px)]">
                                                <Image src={imageMap[sparePart._id]} alt={sparePart.name} width={120} height={110} className="h-full w-full object-contain" />
                                            </div>
                                            <p className="text-white font-bold text-center absolute bottom-2 left-1/2 -translate-x-1/2 w-full">{sparePart.name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Explore Now Section */}
                <div className="flex justify-center items-center px-4 pb-4">
                    <button
                        className="w-full flex flex-row items-center justify-center gap-2 px-8 py-3 bg-[#d45815] rounded-full min-w-[203px] h-12 hover:bg-[#c24d10] transition-colors duration-200 cursor-pointer"
                        onClick={handleExploreNow}
                    >
                        <span className="text-white font-bold text-base font-montserrat">
                            Explore Now
                        </span>
                        <Image src="/icon-arr.png" alt="Arrow Icon" width={24} height={24} className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideModal;

