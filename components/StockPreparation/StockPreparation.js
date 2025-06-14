'use client';
import NavigationTabs from '@/components/StockPreparation/NavigationTabs';
import SideModal from '@/components/StockPreparation/SideModal';
import StatusLegend from '@/components/StockPreparation/StatusLegend';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/stock.module.css';
import { useHeader } from '@/context/HeaderContext';
import { cn } from '@/lib/utils';

const StockPreparation = ({ data }) => {
    const [status, setStatus] = useState("Healthy");

    useEffect(() => {
        if (!data?.length) return;
        let currentStatus = "Healthy";
        data?.forEach(part => {
            if (part?.clientMachineSparePart.totalRunningHours?.value > part?.lifeTime?.value) {
                currentStatus = "Attention";
            }
            else if (part?.clientMachineSparePart?.totalRunningHours?.value == part.lifeTime?.value && currentStatus !== "Attention") {
                currentStatus = "Monitor";
            }
        });
        setStatus(currentStatus);
    }, [data]);

    const { animateHeaderShow } = useHeader();

    const [showSideBar, setShowSideBar] = useState(false);
    const handleClick = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <div className=''>
            <div className="w-full flex flex-col container">
                <div className={`my-4 ${!animateHeaderShow ? '-translate-y-[80px]' : 'translate-y-0'} transition-all duration-300`}>
                    <NavigationTabs />
                </div>
                <div className='fixed inset-0 -z-1'>
                    <div className='cost-benegit-three-d h-full w-full' />

                    {/* main image */}
                    <Image alt='' src={"/scope-image.png"} width={1700} height={1080} priority className='w-full h-full fixed -z-1 inset-0 object-cover object-bottom-left' />

                    {/* trashwell  */}
                    <div className={styles.trashwell} onClick={() => setShowSideBar(false)}>
                        <Image src="/trashwell-hover.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        <Image src="/trashwell-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>

                    <div className={styles.hydrapulper} onClick={handleClick}>
                        {
                            status == "Attention" ? <Image src="/hydrapulper-hovert.png" alt='' height={200} width={200} className={styles.hoverBg} /> :
                                status == "Monitor" ? <Image src="/yellow-overlay.png" alt='' height={200} width={200} className={styles.hoverBg} /> :
                                    <Image src="/green-overlay.png" alt='' height={200} width={200} className={styles.hoverBg} />
                        }
                        <Image src="/hydrapulper-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>

                    {/* hydrapurge */}
                    <div className={styles.hydrapurge} onClick={() => setShowSideBar(false)}>
                        <Image src="/hydrapurge-hover.png" alt='' height={200} width={200} className={cn(styles.hoverBg, 'filter hue-rotate-[-85deg] saturate-[1.5] brightness-[1.5]')} />
                        <Image src="/hydrapurge-tooltip.png" alt='' height={200} width={500} className={styles.tooltip} />
                    </div>

                    {/* mtk */}
                    <div className={styles.mtk} onClick={() => setShowSideBar(false)}>
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

export default StockPreparation;
