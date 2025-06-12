import Image from "next/image";

const Header = ({sendEmail}) => {

    return (
        <>
            <div className="flex flex-col gap-x-2 bg-secondary-blue relative">
                <div className="bg-[#2d3e5c] rounded-t-xl px-5 py-1 w-fit">
                    <h1 className="text-white font-lato text-base">Spare Parts Analysis (Hydrapulper)</h1>
                </div>

                <div className="flex flex-row items-center w-full border-b border-[#96a5ba]">
                    <div className="flex items-end-safe gap-1 p-2.5">
                        <span className="text-[#d45815] font-montserrat font-bold ps-4">Rotor</span>
                        {/* <RiArrowRightSLine size={24} /> */}
                    </div>
                    {/* <div className="flex items-end-safe gap-1 p-2.5">
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
                </div> */}
                </div>

                <div className="flex justify-end mt-4 absolute right-4">
                    <button
                        onClick={sendEmail}
                        className="flex cursor-pointer items-center gap-2 bg-[#2d3e5c] text-white px-8 py-3 rounded-[50px] hover:bg-[#1f2b3f] transition-colors duration-200"
                    >
                        <Image src="/icon-gea.png" width={24} height={24} alt="Gear icon" />
                        <span className="font-montserrat font-bold">Schedule Maintenance</span>
                    </button>
                </div>

            </div>
            
        </>
    );
};

export default Header;