import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NavigationBar = ({ activeTab = 'pulping', onTabChange = () => { } }) => {
    const navigationItems = [
        { id: 0, label: 'Stock Preparation', isHeader: true },
        { id: 1, label: 'Pulping & Detrashing' },
        { id: 2, label: 'HD Cleaning and Coarse Screening' },
        { id: 3, label: 'MD Cleaning' },
        { id: 4, label: 'Fine Screening' },
        { id: 5, label: 'LW Cleaning and Thickening' },
    ];

    return (
        <div className="flex items-center h-10 font-montserrat mt-2">
            {/* Stock Preparation Header */}
            <div className="flex items-center h-[38px] px-5 py-[7px] bg-[#f9f9f9] border-r-2 border-[#607797] min-w-max">
                <span className="text-[#607797] text-base font-medium leading-6">
                    Stock Preparation
                </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center h-[38px] group">
                {navigationItems.slice(1).map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn("font-semibold font-montserrat cursor-pointer px-4 py-[15px] whitespace-nowrap transition-all duration-500 ease-out relative overflow-hidden min-w-[160px] max-w-[200px] select-none hover:max-w-[500px] hover:z-10",
                            activeTab === item.id ? 'bg-[#f5f7f9]' : '')}
                        onClick={() => onTabChange(item.id)}
                        style={{
                            textOverflow: 'ellipsis',
                            transformOrigin: 'center'
                        }}
                    >
                        <span className="text-[#2d3e5c] text-base font-bold leading-[18px]">
                            {item.label}
                        </span>
                    </Link>
                ))}

                {/* Icon Button */}
                <button className="flex items-center justify-center w-[34px] h-[34px] ml-1 rounded-full bg-[#dfe6ec] hover:bg-[#d0dae3] transition-all duration-300 group-hover:rotate-[180deg]">
                    <Image
                        src="/icon.png"
                        alt="Navigation Icon"
                        width={24}
                        height={24}
                        className="p-[5px] rotate-[180deg]"
                    />
                </button>
            </div>
        </div>
    );
};

export default NavigationBar