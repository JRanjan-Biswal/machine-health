import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const RotorComponent = ({ currentState = true, optimalState = true, currentStateImge = "/image-95.png", optimalStateimg = "/image-94.png", percentage = "60%", comment = "No comments available yet." }) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    return (
        <div className="w-[407px] bg-[#2d3e5c] rounded-xl p-5">
            <h1 className="text-2xl font-bold text-white font-lato">Rotor</h1>

            <div className="w-full h-[1px] bg-[#607797] my-4" />

            <div className="flex flex-col gap-5">
                {/* Current State Section */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-base font-montserrat font-medium">Current State</h2>
                    <div className="relative w-full h-[calc(50svh_-_230px)] bg-[#dfe6ec] rounded-md overflow-hidden">
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100">
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        {
                            currentStateImge &&
                            <Image src={currentStateImge} width={397} height={351} alt="current state" className="object-cover h-full" />
                        }
                    </div>
                </div>

                {/* Optimal State Section */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-base font-montserrat font-medium">Optimal State</h2>
                    <div className="relative w-full h-[calc(50svh_-_230px)] bg-[#607797] rounded-md overflow-hidden">
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100">
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        {
                            optimalStateimg && <Image src={optimalStateimg} height={340} width={371.6} alt="optimal state" className="object-cover h-full" />
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
                        <Image
                            src="/icon.png"
                            width={22}
                            height={22}
                            alt="comment icon"
                            className={`transition-transform duration-300 ${isCommentsOpen ? 'rotate-90' : 'rotate-[270deg]'}`}
                        />
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isCommentsOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="bg-[#1e2a3d] rounded-lg p-4 text-[#dfe6ec]">
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

