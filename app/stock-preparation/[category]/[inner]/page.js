'use client';
import RotorStatus from '@/components/MachineryDetails/rotorstatus';
import RotorLayout from '@/components/StockPreparationCategoryInner/RotorLayout';
import Image from 'next/image';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-between mt-6 mx-3 gap-4'>
            <div className='bg-white p-4 w-3/4'>
                <RotorStatus />

                <div className='h-[calc(100%_-_190px)] mt-4 relative'>
                    <div className='text-[#96A5BA]'>Pulping &gt; Hydraulic pulper &gt; Rotor</div>
                    <div className='text-3xl font-bold'>Rotor</div>
                    {/* main image */}
                    <div className='absolute h-[500px] w-[600px] right-0 bottom-0'>
                        <Image src="/rotor.png" alt="" height={300} width={300} className='w-full h-full object-fill' />

                        <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[15px] w-[24%] absolute top-[35%] right-[80%] z-10' />
                        <p className='cursor-pointer absolute top-[33.5%] right-[104%] w-max shadow-md border border-[#DFE6EC] rounded-full px-2 hover:bg-secondary-blue'>Power Saver</p>

                        <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[15px] w-[24%] absolute top-[50%] right-[99%] z-10' />
                        <p className='cursor-pointer absolute top-[48.5%] right-[123%] w-max shadow-md border border-[#DFE6EC] rounded-full px-2 hover:bg-secondary-blue'>Foil</p>

                        <Image src="/top-right.png" alt='' width={100} height={2} className='h-[30px] w-[18%] absolute top-[62%] right-[89%] z-10' />
                        <p className='cursor-pointer absolute top-[64%] right-[107%] w-max shadow-md border border-[#DFE6EC] rounded-full px-2 hover:bg-secondary-blue'>Side shield</p>

                        <Image src="/power-saver-arrow.png" alt='' width={100} height={2} className='h-[15px] w-[24%] absolute top-[90%] right-[80%] z-10' />
                        <p className='cursor-pointer absolute top-[88.5%] right-[104%] w-max shadow-md border border-[#DFE6EC] rounded-full px-2 hover:bg-secondary-blue'>Side shield</p>

                    </div>
                </div>

                <div className='bg-[#DFE6EC] w-full flex justify-between p-4'>
                    <div className='flex gap-5'>
                        <div>
                            <p className='font-semibold'>Installation date</p>
                            <p>(17/08/2024)</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Installation date</p>
                            <p>(17/08/2024)</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Installation date</p>
                            <p>(17/08/2024)</p>
                        </div>
                    </div>
                </div>
            </div>
            <RotorLayout />
        </div>
    );
};

export default Page;
