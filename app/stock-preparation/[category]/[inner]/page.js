'use client';
import React, { useCallback, useEffect } from 'react';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import RotorComponent from '@/components/StockPreparationCategoryInner/RotorComponent';
// import RotorLayout from '@/components/StockPreparationCategoryInner/RotorLayout';
import Image from 'next/image';
import { LuRotate3D } from "react-icons/lu";
import { useHeader } from '@/context/HeaderContext';
import { CgPlayButtonO } from "react-icons/cg";
import Modal from '@/components/CostBenefit/Modal';
import { cn } from '@/lib/utils';
import { formatNumberAsPerCountry } from '@/lib/currencyChange';
import { useCurrency } from '@/context/CurrencyContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const imageData = {
    'Power Saver': ['/power-saver-1.png', '/power-saver-2.png'],
    'Foil': ['/foil-1.png', '/foil-2.png'],
    'Side Shield': ['/side-shield-1.png', '/side-shield-2.png'],
    'Bottom Knife': ['/bottom-knife-1.png', '/bottom-knife-2.png']
}

const partIdMaps = {
    'Foil': "684610b78576c08de8d762dd",
    "Side Shield": "684610c48576c08de8d76311",
    "Power Saver": "684610d28576c08de8d76345",
    "Bottom Knife": "684610da8576c08de8d76379",
}

const mainImage = [
    '/rotor.png',
    '/rotor-rotated.png',
    '/rotor-bottom-knife.png',
]

const Page = () => {


    const { animateHeaderShow } = useHeader();

    const [isOpen, setIsOpen] = React.useState(false);
    const [isZoomOpen, setIsZoomOpen] = React.useState({ image: null, bool: false });

    const { selectedCurrency, currencyValue } = useCurrency();

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [bottomKnkifeSelected, setBottomKnifeSelected] = React.useState(false);
    const [selectedMainImage, setSelectedMainImage] = React.useState(0);
    const [sparePartsStatus, setSparePartsStatus] = React.useState([]); // rotor status

    const [sparePartData, setSparePartData] = React.useState(null); // give entire rotor data

    const [sparePartAllData, setSparePartAllData] = React.useState(null); // adds all spare part data
    const [partCurrentStateImage, setPartCurrentStateImage] = React.useState(null);
    const [partCurrentStateImageComment, setPartCurrentStateImageComment] = React.useState(null);

    //spare part images
    // const [sparePartImages, setSparePartImages] = React.useState([]);

    const [machinePart, setMachinePart] = React.useState(null); // 'power saver' | 'foil' | 'side shield' | 'bottom knife'

    const fetchSparePart = async () => {
        const response = await fetch('/api/sparepart');
        const data = await response.json();

        // used for rotor status
        setSparePartsStatus(data.data);

        // initally set the rotor image
        const rotorArrData = data.sparePartData?.filter(item => item?.part?.name == "Rotor")?.[0];
        const rotorImageData = rotorArrData?.imageUrls?.map(item => `https://api.healthmonitorapp.online${item}`);
        const rotorCommentData = rotorArrData?.comments;
        setPartCurrentStateImage(rotorImageData);
        setPartCurrentStateImageComment(rotorCommentData);
        // console.log(rotorImageArrData);

        // saves all spare part data
        setSparePartAllData(data.sparePartData);

        setSparePartData(data.data.find(sparePart => sparePart._id === '684363cf58886bd63a211b24')); // give entire rotor data
    }

    const handleImageClick = (key) => {

        // seleccts static optimal and current state image
        setSelectedImage(imageData[key]);
        setMachinePart(key);
        setSelectedMainImage(0);

        const partId = partIdMaps[key];

        // gets the current state image
        const partCurrentStateImage = sparePartAllData?.find(item => item?.part?._id === partId);
        console.log(partCurrentStateImage);

        const currentStateImage = partCurrentStateImage?.imageUrls?.map(item => `https://api.healthmonitorapp.online${item}`);
        setPartCurrentStateImage(currentStateImage);
        setPartCurrentStateImageComment(partCurrentStateImage?.comments);

        // if (sparePartData.clientSparePartPhotos) {
        //     const partCurrentStateImage = sparePartData.clientSparePartPhotos.find(photo => photo.part === partId);

        //     console.log(sparePartData);

        //     if (partCurrentStateImage) {
        //         setPartCurrentStateImage(partCurrentStateImage.imageUrl);
        //         setPartCurrentStateImageComment(partCurrentStateImage.comments);
        //     }
        // }
        // setSelectedMainImage({ image: null, rotation: 0 });
        if (key === 'Bottom Knife') {
            setBottomKnifeSelected(imageData[key]);
        }
        else {
            setBottomKnifeSelected(false);
        }
    };

    const handleRotateThree = useCallback(() => {
        setSelectedMainImage(prev => prev == 2 ? 0 : prev + 1);
        setMachinePart(null);
        if (selectedMainImage === 2) {
            setSelectedImage(imageData["Power Saver"]);
        }
        if (selectedMainImage === 1) {
            setBottomKnifeSelected(imageData["Bottom Knife"]);
            setSelectedImage(imageData["Bottom Knife"]);
        }
        else {
            setBottomKnifeSelected(false);
        }
    }, [selectedMainImage]);

    useEffect(() => {
        fetchSparePart();
    }, []);

    // angular-arrow
    return (
        <>
            <div className={`flex justify-between mt-6 mx-3 gap-4 container ${!animateHeaderShow ? '-translate-y-[80px] h-[calc(100svh_-_60px)]' : 'translate-y-0 h-[calc(100svh_-_140px)]'} transition-all duration-300`}>
                <div className='bg-white w-3/4 shadow-custom-2 rounded-xl relative overflow-hidden'>
                    <div className='px-4 pt-4'><RotorStatus sparePartsStatus={sparePartsStatus} /></div>

                    {/* line */}
                    <div className="absolute top-[145px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

                    <div className='h-[calc(100%_-_240px)] mt-8 relative px-4'>
                        <div className='text-[#96A5BA]'>Pulping &gt; Hydrapulper &gt; Rotor</div>
                        <div className='text-3xl font-bold text-primary-blue'>Rotor</div>
                        {/* main image section */}
                        <div className={`absolute h-[calc(100%_-_30px)] right-[8%] bottom-[5%]`}>
                            {
                                selectedMainImage === 1 &&
                                <Image src={"/rotor-rotated.png"} alt="" height={300} width={300} className='w-full h-full object-cover' />
                            }

                            {
                                (selectedMainImage != 1) && (
                                    !bottomKnkifeSelected
                                        ? <Image src="/rotor.png" alt="" height={300} width={300} className='w-full h-full object-contain' />
                                        : <Image src="/rotor-bottom-knife.png" alt="" height={300} width={300} className='w-auto h-full object-contain' />
                                )
                            }

                            {
                                selectedMainImage !== 1 &&
                                <>
                                    {
                                        selectedMainImage !== 2 &&
                                        <>
                                            <Image src="/power-saver-arrow.png" alt='' width={100} height={2}
                                                className={`absolute z-10 ${bottomKnkifeSelected ? 'w-[15%] h-[9px] top-[31%] right-[100%]' : 'top-[24%] right-[83%] z-10 w-[18%] h-[9px]'}`} />

                                            <p
                                                onClick={(e) => handleImageClick("Power Saver")}
                                                className={cn(
                                                    "cursor-pointer text-primary-blue font-lato font-medium text-base absolute",
                                                    "w-max shadow-md border border-[#DFE6EC] rounded-full px-3 py-[5px] hover:bg-primary-blue hover:text-white transition-all duration-300",
                                                    bottomKnkifeSelected ? 'top-[28%] right-[114.5%]' : 'top-[21%] right-[100.5%]'
                                                )}
                                            >
                                                Power Saver
                                            </p>

                                            <Image src="/power-saver-arrow.png" alt='' width={100} height={2}
                                                className={`absolute ${bottomKnkifeSelected ? 'h-[9px] w-[17%] top-[73.5%] right-[96%]' : 'h-[9px] w-[17%] top-[48%] right-[99%]'} z-10`} />

                                            <p onClick={(e) => handleImageClick("Foil")} className={`cursor-pointer text-primary-blue font-lato font-medium text-base absolute ${bottomKnkifeSelected ? 'top-[71%] right-[112.5%]' : 'top-[45%] right-[115%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-3 py-[5px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Foil</p>

                                            {
                                                bottomKnkifeSelected
                                                    ? <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[9px] w-[18%] absolute top-[61%] right-[98%] z-10' />
                                                    : <Image src="/top-right.png" alt='' width={100} height={2} className='h-[20px] w-[13%] absolute top-[62%] right-[89%] z-10' />
                                            }
                                            <p onClick={(e) => handleImageClick("Side Shield")} className={`cursor-pointer text-primary-blue font-lato font-medium text-base absolute ${bottomKnkifeSelected ? 'top-[58%] right-[115.5%]' : 'top-[61.4%] right-[101.5%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-3 py-[5px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Side Shield</p>
                                        </>
                                    }

                                    {
                                        bottomKnkifeSelected
                                            ? <Image src="/angular-arrow.png" alt='' width={100} height={2} className='h-[20%] w-[42%] absolute top-[73%] right-[73%] z-10' />
                                            : <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[9px] w-[17%] absolute top-[79%] right-[86%] z-10' />
                                    }
                                    <p onClick={(e) => handleImageClick("Bottom Knife")} className={`cursor-pointer text-primary-blue font-lato font-medium text-base absolute ${bottomKnkifeSelected ? 'top-[87.7%] right-[114%]' : 'top-[76%] right-[102.5%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-3 py-[5px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Bottom Knife</p>
                                </>
                            }


                        </div>
                    </div>

                    <div className='bg-[#DFE6EC] w-full flex justify-between items-center p-4 absolute bottom-0'>
                        <div className='flex gap-6'>
                            <div>
                                <p className='font-semibold font-lato text-xl text-primary-blue'>Installation date</p>
                                <p className='text-primary-blue'>({sparePartData?.clientMachineSparePart?.machineData?.installationDate ? new Date(sparePartData?.clientMachineSparePart?.machineData?.installationDate).toLocaleDateString('en-GB') : 'NIL'})</p>
                            </div>
                            <div>
                                <p className='font-semibold font-lato text-xl text-primary-blue'>Last Rebuilt date</p>
                                <p className='text-primary-blue'>NIL</p>
                            </div>
                            <div>
                                <p className='font-semibold font-lato text-xl text-primary-blue'>Running Hours</p>
                                <p className='text-primary-blue'>
                                    {formatNumberAsPerCountry(sparePartData?.clientMachineSparePart?.totalRunningHours?.value, selectedCurrency || "INR", currencyValue)}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={() => setIsOpen(true)} className='cursor-pointer flex bg-white items-center px-[8px] py-[6px] rounded-4xl gap-1.5'><CgPlayButtonO size={20} /></button>
                            <button className='cursor-pointer flex bg-white px-[13px] py-[6px] rounded-4xl gap-1.5' onClick={handleRotateThree}><p>Rotate 3D</p><LuRotate3D size={20} /></button>
                        </div>
                    </div>
                </div>
                <RotorComponent
                    setIsZoomOpen={setIsZoomOpen}
                    optimalStateimg={selectedImage?.[1]}
                    currentStateImge={partCurrentStateImage || selectedImage}
                    comment={partCurrentStateImageComment || "No comments available yet."}
                    machinePart={machinePart}
                />
            </div>

            {/* Modal for image zoom */}
            <Modal isOpen={isZoomOpen?.bool} onClose={() => setIsZoomOpen({ image: null, bool: false })} blogContentClassName='relative w-[50vw] px-0 pb-0 pt-0 overflow-hidden'>
                <div className="flex justify-end items-center cursor-pointer absolute top-4 right-4 z-10 border-2 border-white rounded-full w-[36px] h-[36px]">
                    <button
                        onClick={() => setIsZoomOpen(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer flex w-full h-full items-center justify-center"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='flex justify-center items-center w-full h-full gap-7'>
                    {
                        isZoomOpen?.image?.length &&
                        <Swiper slidesPerView={1} pagination={{ clickable: true }} modules={[Pagination]} className='w-full h-full'>
                            {
                                isZoomOpen?.image?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <Image src={item} width={397} height={351} alt="current state" className=" w-full" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    }
                    {/* {
                        isZoomOpen?.image &&
                        <Image
                            src={isZoomOpen?.image} width={500} height={500} alt='zoomed image'
                            className='object-cover h-auto w-full'
                        />
                    } */}
                </div>
            </Modal>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex justify-end items-center cursor-pointer">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='flex justify-center items-center h-full gap-7'>
                    <div>
                        <p className='text-primary-blue font-lato font-semibold text-2xl text-center pb-4'>Current State</p>
                        <video
                            src={"https://api.healthmonitorapp.online" + sparePartData?.clientSparePartVideo?.videoUrl}
                            width={500}
                            height={500}
                            muted
                            controls
                            className='object-cover h-[280px]'
                        />
                    </div>
                    <div>
                        <p className='text-primary-blue font-lato font-semibold text-2xl text-center pb-4'>Optimal State</p>
                        <video
                            src={"/optimal_state_hydrapulper.mp4"}
                            width={500}
                            height={500}
                            muted
                            controls
                            className='object-cover h-[280px]'
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Page;
