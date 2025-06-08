import Image from "next/image";
import Link from "next/link";

const NavigationBar = ({ activeTab = 'pulping', onTabChange = () => { } }) => {
    const navigationItems = [
        { id: 'stock', label: 'Stock Preparation', isHeader: true },
        { id: 'pulping', label: 'Pulping & Detrashing' },
        { id: 'cleaning', label: 'Cleaning' },
        { id: 'screening', label: 'Screening' },
        { id: 'thickening', label: 'Thickening' },
        { id: 'deinking', label: 'Deinking' },
        { id: 'refining', label: 'Refining & Dispersing' },
        { id: 'water', label: 'Water Clarifier' },
    ];

    return (
        <div className="flex items-center h-10 font-montserrat mt-2">
            {/* Stock Preparation Header */}
            <div className="flex items-center h-[38px] px-5 py-[7px] bg-[#f9f9f9] border-r-2 border-[#607797]">
                <span className="text-[#607797] text-base font-medium leading-6">
                    Stock Preparation
                </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center h-[38px]">
                {navigationItems.slice(1).map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center px-5 py-[10px] hover:bg-[#f5f7f9] transition-colors
              ${activeTab === item.id ? 'bg-[#f5f7f9]' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <span className="text-[#2d3e5c] text-base font-bold leading-[18px]">
                            {item.label}
                        </span>
                    </Link>
                ))}

                {/* Icon Button */}
                <button className="flex items-center justify-center w-[34px] h-[34px] ml-1 rounded-full bg-[#dfe6ec] hover:bg-[#d0dae3] transition-colors">
                    <Image
                        src="/icon.png"
                        alt="Navigation Icon"
                        width={24}
                        height={24}
                        className="p-[5px]"
                    />
                </button>
            </div>
        </div>
    );
};

export default NavigationBar