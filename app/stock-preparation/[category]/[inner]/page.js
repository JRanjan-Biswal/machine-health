'use client';
import React, { useCallback, useEffect } from 'react';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import RotorComponent from '@/components/StockPreparationCategoryInner/RotorComponent';
// import RotorLayout from '@/components/StockPreparationCategoryInner/RotorLayout';
import Image from 'next/image';
import { LuRotate3D } from "react-icons/lu";

const Page = () => {

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

    const [selectedImage, setSelectedImage] = React.useState(imageData['Power Saver']);
    const [bottomKnkifeSelected, setBottomKnifeSelected] = React.useState(false);
    const [selectedMainImage, setSelectedMainImage] = React.useState(0);
    const [spareParts, setSpareParts] = React.useState([]);
    const [sparePartData, setSparePartData] = React.useState(null);
    const [partCurrentStateImage, setPartCurrentStateImage] = React.useState(null);
    const [partCurrentStateImageComment, setPartCurrentStateImageComment] = React.useState(null);

    const fetchSparePart = async () => {
        const response = await fetch('/api/sparepart');
        const data = await response.json();
        setSpareParts(data.data);
        setSparePartData(data.data.find(sparePart => sparePart._id === '684363cf58886bd63a211b24'));
    }

    const handleImageClick = (key) => {
        setSelectedImage(imageData[key]);
        setSelectedMainImage(0);
        const partId = partIdMaps[key];
        if (sparePartData.clientSparePartPhotos) {
            const partCurrentStateImage = sparePartData.clientSparePartPhotos.find(photo => photo.part === partId);
            console.log({partCurrentStateImage});

            if (partCurrentStateImage) {
                setPartCurrentStateImage(partCurrentStateImage.imageUrl);
                setPartCurrentStateImageComment(partCurrentStateImage.comments);
            }
        }
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
        <div className='flex justify-between mt-6 mx-3 gap-4 container'>
            <div className='bg-white w-3/4 shadow-custom-2 rounded-xl relative overflow-hidden'>
                <div className='px-4 pt-4'><RotorStatus spareParts={spareParts} /></div>

                {/* line */}
                <div className="absolute top-[145px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

                <div className='h-[calc(100%_-_240px)] mt-8 relative px-4'>
                    <div className='text-[#96A5BA]'>Pulping &gt; Hydrapulper &gt; Rotor</div>
                    <div className='text-3xl font-bold text-primary-blue'>Rotor</div>
                    {/* main image */}
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

                                        <p onClick={(e) => handleImageClick("Power Saver")} className={`cursor-pointer text-primary-blue font-lato font-medium text-base absolute ${bottomKnkifeSelected ? 'top-[28%] right-[114.5%]' : 'top-[21%] right-[100.5%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-3 py-[5px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Power Saver</p>

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
                            <p className='text-primary-blue'>{sparePartData?.clientMachineSparePart?.totalRunningHours?.value || 0}</p>
                        </div>
                    </div>
                    <div>
                        <button className='cursor-pointer flex bg-white px-[13px] py-[6px] rounded-4xl gap-1.5' onClick={handleRotateThree}><p>Rotate 3D</p><LuRotate3D size={20} /></button>
                    </div>
                </div>
            </div>
            <RotorComponent optimalStateimg={selectedImage?.[1]} currentStateImge={partCurrentStateImage ? `https://kadant-api-production.up.railway.app${partCurrentStateImage}` : selectedImage?.[0]} comment={partCurrentStateImageComment || "No comments available yet."} />
        </div>
    );
};

export default Page;
