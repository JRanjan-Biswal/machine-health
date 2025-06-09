import Image from 'next/image';

const RotorComponent = ({ currentState = true, optimalState = true, currentStateImge = "/image-95.png", optimalStateimg="/image-94.png", percentage = "60%" }) => {

    return (
        <div className="w-[407px] bg-[#2d3e5c] rounded-xl p-5">
            <h1 className="text-2xl font-bold text-white font-lato">Rotor</h1>

            <div className="w-full h-[1px] bg-[#607797] my-4" />

            <div className="flex flex-col gap-5">
                {/* Current State Section */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-white text-base font-montserrat font-medium">Current State</h2>
                    <div className="relative w-full h-[252px] bg-[#dfe6ec] rounded-md overflow-hidden">
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100">
                            <Image
                                src="/icon-exp.png"
                                width={24}
                                height={24}
                                alt="expand"
                            />
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
                    <div className="relative w-full h-[252px] bg-[#607797] rounded-md overflow-hidden">
                        <div className="absolute top-2.5 right-2.5 bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-100">
                            <Image
                                src="/icon-exp.png"
                                width={24}
                                height={24}
                                alt="expand"
                            />
                        </div>
                        {
                            optimalStateimg && <Image src={optimalStateimg} height={340} width={371.6} alt="optimal state" className="object-cover h-full" />
                        }
                    </div>
                </div>

                {/* Comments Section */}
                {/* <div className="flex flex-row items-center justify-between">
                    <h2 className="text-[#dfe6ec] text-base font-montserrat font-bold">Comments</h2>
                    <Image
                        src="/icon.png"
                        width={22}
                        height={22}
                        alt="comment icon"
                    />
                </div> */}

                {/* Progress Section */}
                {/* <div className="flex flex-col items-center gap-2">
                    <span className="text-[#2d3e5c] text-xl font-lato font-bold">{percentage}</span>
                    <Image
                        src="/placeholder.svg"
                        width={109}
                        height={19}
                        alt="progress"
                    />
                </div> */}

                {/* View Details Button */}
                <button className="flex items-center justify-center gap-2 bg-[#d45815] text-white py-4 px-8 rounded-full hover:bg-[#c24d12] transition-colors group cursor-pointer">
                    <Image src="/icon-gea.png" width={24} height={24} alt="gear icon" className='transition-all duration-300 group-hover:rotate-90' />
                    <span className="font-montserrat font-bold text-base">View Details</span>
                </button>
            </div>
        </div>
    );
};

export default RotorComponent;

