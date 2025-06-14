import { RiResetLeftFill } from "react-icons/ri";
import { useEffect } from 'react';
import '@/app/styles/timeline.css';
import { formatCurrency, formatNumberAsPerCountry } from "@/lib/currencyChange";
import { useCurrency } from "@/context/CurrencyContext";

const Timeline = ({ currentRunningHours, setCurrentRunningHours, installedOn, lifespan, resetChartData }) => {

    const { selectedCurrency } = useCurrency();

    useEffect(() => {
        const button = document.querySelector('.animatedButton');
        if (!button) return;

        const handleClick = () => {
            button.classList.add('animate-rotate');
            setTimeout(() => {
                button.classList.remove('animate-rotate');
            }, 500);
        };

        button.addEventListener('click', handleClick);
        return () => button.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="mt-12 mx-auto w-[calc(100%_-_32px)] absolute bottom-[40px]">
            <div className="slider-container mx-auto relative">
                <div className="slider-track">
                    <div className="slider-marker" style={{ left: "25%" }}></div>
                    <div className="slider-marker" style={{ left: "50%" }}></div>
                    <div className="slider-marker" style={{ left: "75%" }}></div>
                </div>
                <input
                    type="range" min="0" max="7200"
                    value={currentRunningHours}
                    className="slider"
                    onChange={(e) => setCurrentRunningHours(e.target.value)}
                />

                <button className="absolute -right-10 cursor-pointer animatedButton" onClick={resetChartData}><RiResetLeftFill size={24} /></button>
            </div>

            <div className="flex justify-between mt-4 text-[#2d3e5c] font-bold w-[70%] mx-auto">
                <div className="text-center">
                    <p>Installed On</p>
                    <p>({installedOn ? new Date(installedOn).toLocaleDateString('en-GB') : 'N/A'})</p>
                </div>
                <div className="text-center">
                    <p>Lifespan</p>
                    <p>{formatNumberAsPerCountry(lifespan, selectedCurrency || 'INR', true)} Hrs</p>
                </div>
                <div className="text-center">
                    <p>Current running hours</p>
                    <p>({formatNumberAsPerCountry(currentRunningHours, selectedCurrency || 'INR', true)} Hrs)</p>
                </div>
            </div>
        </div>
    );
};

export default Timeline;