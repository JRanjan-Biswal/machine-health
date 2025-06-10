
const Timeline = ({ currentRunningHours, setCurrentRunningHours, installedOn, lifespan }) => {
    return (
        <div className="mt-12 mx-auto w-full absolute bottom-[40px]">
            <div className="slider-container mx-auto">
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
            </div>

            <div className="flex justify-between mt-4 text-[#2d3e5c] font-bold w-[70%] mx-auto">
                <div className="text-center">
                    <p>Installed On</p>
                    <p>({installedOn ? new Date(installedOn).toLocaleDateString('en-GB') : 'N/A'})</p>
                </div>
                <div className="text-center">
                    <p>Lifespan</p>
                    <p>{lifespan} Hrs</p>
                </div>
                <div className="text-center">
                    <p>Current running hours</p>
                    <p>({currentRunningHours} Hrs)</p>
                </div>
            </div>
        </div>
    );
};

export default Timeline;