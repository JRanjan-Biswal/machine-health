'use client';
import { useCallback, useState } from 'react';
import NavigationBar from '@/components/CostBenefit/Navigationbar';
import Sidebar from '@/components/CostBenefit/Sidebar';
import MainContent from '@/components/CostBenefit/MainContent';

const CostBenefit = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const handleSideBarView = useCallback(() => {
        setShowSideBar(!showSideBar);
    }, [showSideBar])

    return (
        <div className="container transition-all duration-300">
            <div><NavigationBar /></div>
            <div className="flex flex-row w-full gap-4 mt-4 h-[calc(100svh_-_200px)]">
                <div className="flex-grow-0">
                    <Sidebar handleSideBarView={handleSideBarView} showSideBar={showSideBar} />
                </div>
                <div className="flex-grow"
                    style={{ width: showSideBar ? 'calc(100% - 334px)' : 'calc(100% - 50px)' }}
                >
                    <MainContent />
                </div>
            </div>
        </div>
    );
}

export default CostBenefit;