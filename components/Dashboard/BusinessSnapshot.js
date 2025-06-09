import Image from 'next/image';

const BusinessSnapshot = ({
  endProduct = "Kraft Test Liner",
  capacity = "400 BDMTPD",
  location = "Vapi, Gujarat, India"
}) => {
  return (
    <div className="border-2 border-[#96a5ba] rounded-md p-6 bg-white w-[300px]">
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-lato text-[18px] font-semibold leading-6 text-[#2d3e5c]">End Product</p>
          <p className="font-lato text-base font-medium leading-6 text-[#2d3e5c]">{endProduct}</p>
        </div>

        <div>
          <p className="font-lato text-[18px] font-semibold leading-6 text-[#2d3e5c]">Capacity</p>
          <p className="font-lato text-base font-medium leading-6 text-[#2d3e5c]">{capacity}</p>
        </div>

        <div>
          <p className="font-lato text-[18px] font-semibold leading-6 text-[#2d3e5c]">Location</p>
          <p className="font-lato text-base font-medium leading-6 text-[#2d3e5c]">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSnapshot;
