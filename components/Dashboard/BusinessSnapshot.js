
const BusinessSnapshot = ({clientInfo}) => {

  return (
    <div className="border-2 border-[#96a5ba] rounded-md p-6 bg-white w-[300px]">
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-lato font-semibold leading-6 text-[#2d3e5c]">End Product</p>
          <p className="font-lato text-[14px] font-medium leading-6 text-[#2d3e5c]">{clientInfo.endProduct}</p>
        </div>

        <div>
          <p className="font-lato font-semibold leading-6 text-[#2d3e5c]">Capacity</p>
          <p className="font-lato text-[14px] font-medium leading-6 text-[#2d3e5c]">{clientInfo.capacity} BDMTPD</p>
        </div>

        <div>
          <p className="font-lato font-semibold leading-6 text-[#2d3e5c]">Location</p>
          <p className="font-lato text-[14px] font-medium leading-6 text-[#2d3e5c]">{clientInfo.location}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSnapshot;
