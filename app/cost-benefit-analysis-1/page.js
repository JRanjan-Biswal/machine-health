'use client';
import NavigationTabs from '@/components/StockPreparation/NavigationTabs';
import StatusLegend from '@/components/StockPreparation/StatusLegend';
import Image from 'next/image';
import React from 'react';


const Layout = () => {

    return (
        <div className="w-full flex flex-col container">
            <div className='my-4'>
                <NavigationTabs />
            </div>
            <div className='fixed inset-0 -z-1'>
                <div className='cost-benegit-three-d h-full w-full' />

                {/* trashwell  */}
                <Image src={"/scope-image.png"} width={1700} height={1080} className='w-full h-full fixed -z-1 inset-0 object-cover object-bottom-left' />
                <div className='trashwell'>
                    <Image src="/trashwell-hover.png" alt='' height={200} width={200} />
                </div>
            </div>
            {/* <Image src="/scope-image.png" alt='' width={1400} height={1400} className='w-full h-full' /> */}
            <StatusLegend />
        </div>
    );
};

export default Layout;
