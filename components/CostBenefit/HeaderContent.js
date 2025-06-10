import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from 'react';
import Modal from './Modal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-x-2 bg-secondary-blue relative">
            <div className="bg-[#2d3e5c] rounded-t-xl px-5 py-1 w-fit">
                <h1 className="text-white font-lato text-base">Spare Parts Analysis (Hydrapulper)</h1>
            </div>

            <div className="flex flex-row items-center w-full border-b border-[#96a5ba]">
                <div className="flex items-end-safe gap-1 p-2.5">
                    <span className="text-[#d45815] font-montserrat font-bold ps-4">Rotor</span>
                    <RiArrowRightSLine size={24} />
                </div>
                <div className="flex items-end-safe gap-1 p-2.5">
                    <span className="text-[#2d3e5c] font-montserrat font-bold">Rotor Shaft</span>
                    <RiArrowRightSLine size={24} />
                </div>
                <div className="flex items-end-safe gap-1 p-2.5">
                    <span className="text-[#2d3e5c] font-montserrat font-bold">Rotor hub</span>
                    <RiArrowRightSLine size={24} />
                </div>
                <div className="flex items-end-safe gap-1 p-2.5">
                    <span className="text-[#2d3e5c] font-montserrat font-bold">BedPlate</span>
                    <RiArrowRightSLine size={24} />
                </div>
            </div>

            <div className="flex justify-end mt-4 absolute right-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2d3e5c] text-white px-8 py-3 rounded-[50px] hover:bg-[#1f2b3f] transition-colors duration-200"
                >
                    <Image src="/icon-gea.png" width={24} height={24} alt="Gear icon" />
                    <span className="font-montserrat font-bold">Schedule Maintenance</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="space-y-4">
                    <div className="flex justify-end items-center cursor-pointer">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <Image src="mail.svg" alt="Mail icon" width={300} height={100} className="w-[70%] h-auto mx-auto" />
                    </div>
                    <h2 className="text-[#2d3e5c] text-4xl font-bold text-center font-lato">Schedule Maintenance</h2>
                    <div className="space-y-4">
                        {/* Add your modal content here */}
                        <p className="text-gray-600 text-center">We have notified the operations team Thank you, Team Kadant</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Header;