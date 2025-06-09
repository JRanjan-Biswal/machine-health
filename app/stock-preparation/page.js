'use client';
import NavigationTabs from '@/components/StockPreparation/NavigationTabs';
import SideModal from '@/components/StockPreparation/SideModal';
import StatusLegend from '@/components/StockPreparation/StatusLegend';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@/app/styles/stock.module.css';


const Page = () => {

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
                    <div className={styles.trashwell} onClick={handleClick}>
                        <Image src="/trashwell-hover.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        <Image src="/trashwell-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>

                    <div className={styles.hydrapulper} onClick={handleClick}>
                        <Image src="/hydrapulper-hovert.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        <Image src="/hydrapulper-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>
                    <div className={styles.hydrapurge} onClick={handleClick}>
                        <Image src="/hydrapurge-hover.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        <Image src="/hydrapurge-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>
                    <div className={styles.mtk} onClick={handleClick}>
                        <Image src="/mtk-hover.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        <Image src="/mtk-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>
                </div>
                <StatusLegend />
            </div>

            <SideModal handleClick={handleClick} showSideBar={showSideBar} />
        </div>
    );
};

export default Page;
