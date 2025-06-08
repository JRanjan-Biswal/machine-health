'use client';
import NavigationTabs from '@/components/StockPreparation/NavigationTabs';
import SideModal from '@/components/StockPreparation/SideModal';
import StatusLegend from '@/components/StockPreparation/StatusLegend';
import Image from 'next/image';
import React, { useState } from 'react';


const Layout = () => {

    const [showSideBar, setShowSideBar] = useState(false);
    const handleClick = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <div className='overflow-hidden'>
            <div className="w-full flex flex-col container">
                <div className='my-4'>
                    <NavigationTabs />
                </div>
                <div className='fixed inset-0 -z-1'>
                    <div className='cost-benegit-three-d h-full w-full' />

                    {/* trashwell  */}
                    <Image alt='' src={"/scope-image.png"} width={1700} height={1080} className='w-full h-full fixed -z-1 inset-0 object-cover object-bottom-left' />
                    <div className='trashwell'>
                        <Image src="/trashwell-hover.png" alt='' height={200} width={200} className='hover-bg' />
                        <Image src="/trashwell-tooltip.png" alt='' height={200} width={500} className='absolute left-[98px] bottom-[220px] z-10 w-[100px]' />
                    </div>

                    <div className='hydrapulper' onClick={handleClick}>
                        <Image src="/hydrapulper-hovert.png" alt='' height={200} width={200} className='hover-bg' />
                        <Image src="/hydrapulper-tooltip.png" alt='' height={200} width={500} className='absolute left-[-50px] bottom-[158px] z-10 w-[100px]' />
                    </div>
                    <div className='hydrapurge'>
                        <Image src="/hydrapurge-hover.png" alt='' height={200} width={200} className='hover-bg' />
                        <Image src="/hydrapurge-tooltip.png" alt='' height={200} width={500} className='absolute left-[9px] bottom-[158px] z-10 w-[100px]' />
                    </div>
                    <div className='mtk'>
                        <Image src="/mtk-hover.png" alt='' height={200} width={200} className='hover-bg' />
                        <Image src="/mtk-tooltip.png" alt='' height={200} width={500} className='absolute left-[93px] bottom-[197px] z-10 w-[55px]' />
                    </div>
                </div>
                <StatusLegend />
            </div>

            <SideModal handleClick={handleClick} showSideBar={showSideBar} />
        </div>
    );
};

export default Layout;
