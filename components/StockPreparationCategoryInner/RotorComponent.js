import { useHeader } from '@/context/HeaderContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";

const RotorComponent = ({ currentState = true, setIsZoomOpen, optimalState = true, currentStateImge = "/image-95.png", optimalStateimg = "/image-94.png", percentage = "60%", comment, machinePart }) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { animateHeaderShow } = useHeader();

    return (
        <div className="w-[407px] bg-[#2d3e5c] rounded-xl p-5">
            <h1 className="text-2xl font-bold text-white font-lato">Rotor<span className='font-lato font-normal text-lg'>{machinePart ? ": " + machinePart : ""}</span></h1>

            <div className="w-full h-[1px] bg-[#607797] my-4" />

            <div className="flex flex-col gap-5">
                {/* Current State Section */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-base font-montserrat font-medium">Current State</h2>
                    <div className={cn(
                        'relative w-full transition-all duration-300 bg-[#dfe6ec] rounded-md overflow-hidden',
                        [!isCommentsOpen && animateHeaderShow && 'h-[calc(50svh_-_230px)]'], // comment is close | header is in veiw
                        [!isCommentsOpen && !animateHeaderShow && 'h-[calc(50svh_-_190px)]'],// comment is closed | header not in veiw
                        [isCommentsOpen && animateHeaderShow && 'h-[calc(50svh_-_260px)]'],// comment is open | header is in view
                        [isCommentsOpen && !animateHeaderShow && 'h-[calc(50svh_-_220px)]']// comment is open | header is not in view
                    )}>
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100"
                            onClick={() => setIsZoomOpen({ image: currentStateImge, bool: true })}
                        >
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        {
                            currentStateImge &&
                            <Image src={currentStateImge} width={397} height={351} alt="current state" className=" w-full" />
                        }
                    </div>
                </div>

                {/* Optimal State Section */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-base font-montserrat font-medium">Optimal State</h2>
                    <div className={cn(
                        'relative w-full transition-all duration-300 bg-[#607797] rounded-md overflow-hidden',
                        [!isCommentsOpen && animateHeaderShow && 'h-[calc(50svh_-_230px)]'],
                        [!isCommentsOpen && !animateHeaderShow && 'h-[calc(50svh_-_190px)]'],
                        [isCommentsOpen && animateHeaderShow && 'h-[calc(50svh_-_260px)]'],
                        [isCommentsOpen && !animateHeaderShow && 'h-[calc(50svh_-_220px)]']
                    )}>
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100"
                            onClick={() => setIsZoomOpen({ image: optimalStateimg, bool: true })}
                        >
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        {
                            optimalStateimg && <Image src={optimalStateimg} height={340} width={371.6} alt="optimal state" className="object-cover h-full w-full" />
                        }
                    </div>
                </div>

                {/* Comments Section */}
                <div className="flex flex-col gap-2">
                    <div
                        className="flex flex-row items-center justify-between cursor-pointer"
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                    >
                        <h2 className="text-[#dfe6ec] text-base font-montserrat font-bold">Comments</h2>
                        <SlArrowDown color='#fff' size={14} />
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCommentsOpen ? 'h-[60px] opacity-100' : 'h-0 opacity-0'}`}>
                        <div className="rounded-lg text-[#dfe6ec] h-full overflow-y-scroll thin-scroll">
                            {/* Add your comments content here */}
                            <p className="text-sm">
                                {comment}
                            </p>
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <Link href="/cost-benefit" className="flex items-center justify-center gap-2 bg-[#d45815] text-white py-4 px-8 rounded-full hover:bg-[#c24d12] transition-colors group cursor-pointer">
                    <Image src="/icon-gea.png" width={24} height={24} alt="gear icon" className='transition-all duration-300 group-hover:rotate-90' />
                    <span className="font-montserrat font-bold text-base">View Details</span>
                </Link>
            </div>
        </div>
    );
};

export default RotorComponent;

