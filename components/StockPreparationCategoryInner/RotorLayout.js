const { default: Image } = require("next/image");

const RotorCardExpanded = ({
    currentImage = "/rotor-img-1.png",
    optimalImage = "/rotor-img-optimal-1.png",
    progress = 60,
    comments = "Comments"
}) => {
    return (
        <div className="w-full max-w-md bg-[#2d3e5cff] rounded-xl p-5">
            <h1 className="text-2xl font-bold text-white font-lato mb-4">Rotor</h1>

            <div className="border-t border-[#607797ff] mb-4" />

            <div className="flex flex-col gap-4">
                {/* Current State Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-base font-medium text-white font-montserrat">Current State</h2>
                    <div className="relative w-full h-[252px] bg-[#dfe6ecff] rounded-md">
                        <div className="absolute top-2.5 right-2.5 bg-white rounded-full p-2.5">
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        <div className="relative w-full h-full">
                            <Image
                                src={currentImage}
                                layout="fill"
                                objectFit="cover"
                                alt="Current state"
                                className="rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Optimal State Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-base font-medium text-white font-montserrat">Optimal State</h2>
                    <div className="relative w-full h-[252px] bg-[#607797ff] rounded-md">
                        <div className="absolute top-2.5 right-2.5 bg-white rounded-full p-2.5">
                            <Image src="/icon-exp.png" width={24} height={24} alt="expand" />
                        </div>
                        <div className="relative w-full h-full">
                            <Image
                                src={optimalImage}
                                layout="fill"
                                objectFit="cover"
                                alt="Optimal state"
                                className="rounded-md object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <button className="flex flex-row items-center justify-center gap-2 bg-[#d45815ff] text-white py-4 px-8 rounded-full hover:opacity-90">
                    <Image src="/icon-gea.png" width={24} height={24} alt="gear icon" />
                    <span className="font-montserrat font-bold">View Details</span>
                </button>
            </div>
        </div>
    );
};


const RotorLayout = () => {
    return (
        <div className="w-1/4 flex flex-col md:flex-row justify-center items-start bg-[#2d3e5cff] h-[calc(100svh_-_150px)] overflow-scroll rounded-lg">
            <div className="flex-grow max-w-md m-4">
                <RotorCardExpanded
                    currentImage="/rotor-img-1.png"
                    optimalImage="/rotor-img-optimal-1.png"
                    progress={75}
                    comments="The rotor has been successfully updated and is now operating smoothly. Performance metrics are within optimal range, and no further intervention is required at this stage."
                />
            </div>
        </div>
    );
};

export default RotorLayout;
