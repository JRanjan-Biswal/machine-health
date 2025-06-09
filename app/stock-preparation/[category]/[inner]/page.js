'use client';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import RotorComponent from '@/components/StockPreparationCategoryInner/RotorComponent';
import RotorLayout from '@/components/StockPreparationCategoryInner/RotorLayout';
import Image from 'next/image';
import React from 'react';

const Page = () => {

    const imageData = {
        'Power Saver': ['/power-saver-1.png', '/power-saver-2.png'],
        'Foil': ['/foil-1.png', '/foil-2.png'],
        'Side Shield': ['/side-shield-1.png', '/side-shield-2.png'],
        'Bottom Knife': ['/bottom-knife-1.png', '/bottom-knife-2.png']
    }

    const [selectedImage, setSelectedImage] = React.useState(imageData['Power Saver']);
    const [bottomKnkifeSelected, setBottomKnifeSelected] = React.useState(false);

    const handleImageClick = (key) => {
        setSelectedImage(imageData[key]);

        if (key === 'Bottom Knife') {
            setBottomKnifeSelected(imageData[key]);
        }
        else {
            setBottomKnifeSelected(false);
        }
    }

    // angular-arrow
    return (
        <div className='flex justify-between mt-6 mx-3 gap-4 container'>
            <div className='bg-white w-3/4 shadow-custom-2 rounded-xl relative overflow-hidden'>
                <div className='px-4 pt-4'><RotorStatus /></div>

                {/* line */}
                <div className="absolute top-[145px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

                <div className='h-[calc(100%_-_240px)] mt-8 relative px-4'>
                    <div className='text-[#96A5BA]'>Pulping &gt; Hydraulic pulper &gt; Rotor</div>
                    <div className='text-3xl font-bold text-primary-blue'>Rotor</div>
                    {/* main image */}
                    <div className={`absolute h-[500px] w-[600px] ${bottomKnkifeSelected ? '-right-10' : 'right-[8%]'} bottom-[5%]`}>
                        {
                            !bottomKnkifeSelected
                                ? <Image src="/rotor.png" alt="" height={300} width={300} className='w-full h-full object-cover' />
                                : <Image src="/rotor-bottom-knife.png" alt="" height={300} width={300} className='w-auto h-full object-contain' />
                        }

                        <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className={`absolute ${bottomKnkifeSelected ? 'w-[15%] h-[10px] top-[31%] right-[100%]' : 'top-[24%] right-[83%] z-10 w-[24%] h-[15px]'}`} />
                        <p onClick={(e) => handleImageClick("Power Saver")} className={`cursor-pointer text-primary-blue font-lato font-medium text-xl absolute ${bottomKnkifeSelected ? 'top-[27.5%] right-[115%]' : 'top-[21.5%] right-[106%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-4 py-[6px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Power Saver</p>

                        <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className={`absolute ${bottomKnkifeSelected ? 'h-[10px] w-[17%] top-[73.5%] right-[96%]' : 'h-[15px] w-[24%] top-[48%] right-[99%]'} z-10`} />
                        <p onClick={(e) => handleImageClick("Foil")} className={`cursor-pointer text-primary-blue font-lato font-medium text-xl absolute ${bottomKnkifeSelected ? 'top-[70.5%] right-[111.5%]' : 'top-[45.5%] right-[122%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-4 py-[6px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Foil</p>

                        {
                            bottomKnkifeSelected
                                ? <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[13px] w-[20%] absolute top-[61%] right-[98%] z-10' />
                                : <Image src="/top-right.png" alt='' width={100} height={2} className='h-[30px] w-[18%] absolute top-[62%] right-[89%] z-10' />
                        }
                        <p onClick={(e) => handleImageClick("Side Shield")} className={`cursor-pointer text-primary-blue font-lato font-medium text-xl absolute ${bottomKnkifeSelected ? 'top-[58.5%] right-[117%]' : 'top-[62.5%] right-[106%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-4 py-[6px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Side Shield</p>

                        {
                            bottomKnkifeSelected
                                ? <Image src="/angular-arrow.png" alt='' width={100} height={2} className='h-[81px] w-[37%] absolute top-[73%] right-[77%] z-10' />
                                : <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[15px] w-[24%] absolute top-[79%] right-[86%] z-10' />
                        }
                        <p onClick={(e) => handleImageClick("Bottom Knife")} className={`cursor-pointer text-primary-blue font-lato font-medium text-xl absolute ${bottomKnkifeSelected ? 'top-[84%] right-[113%]' : 'top-[76%] right-[109%]'} w-max shadow-md border border-[#DFE6EC] rounded-full px-4 py-[6px] hover:bg-primary-blue hover:text-white transition-all duration-300`}>Bottom Knife</p>

                    </div>
                </div>

                <div className='bg-[#DFE6EC] w-full flex justify-between p-4 absolute bottom-0'>
                    <div className='flex gap-6'>
                        <div>
                            <p className='font-semibold font-lato text-xl text-primary-blue'>Installation date</p>
                            <p className='text-primary-blue'>(17/08/2024)</p>
                        </div>
                        <div>
                            <p className='font-semibold font-lato text-xl text-primary-blue'>Last Rebuilt date</p>
                            <p className='text-primary-blue'>NIL</p>
                        </div>
                        <div>
                            <p className='font-semibold font-lato text-xl text-primary-blue'>Running Hours</p>
                            <p className='text-primary-blue'>5040</p>
                        </div>
                    </div>
                </div>
            </div>
            <RotorComponent optimalStateimg={selectedImage?.[1]} currentStateImge={selectedImage?.[0]} />
        </div>
    );
};

export default Page;
