'use client';
import MillOverviewModal from "@/components/MillOverviewModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();

  const [showmodal, setshowmodal] = useState(true);
  const handleShowModal = () => setshowmodal(!showmodal);

  const handleHydraPulerClick = () => router.push('/stock-preparation');
  return (
    <>
      {
        showmodal &&
        <div className="flex justify-center items-center w-full h-screen bg-black/60 p-5 absolute inset-0 z-100">
          <MillOverviewModal
            customerName="Select Company"
            powerCost="0.09 €/kwhr"
            fiberCost="200 €/ton"
            capacity="400 BDMTPD"
            location="Vapi, Gujarat, India"
            endProduct="Kraft Test Liner"
            handleShowModal={handleShowModal}
          />
        </div>
      }
      <div className="container h-[calc(100vh_-_260px)] mt-[20px]">
        <div className="flex justify-between mx-5">
          <div>
            <p className="text-[#2D3E5C] font-bold text-2xl">Welcome, Feroz</p>
            <p className="text-xl">Aryan Papers</p>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="bg-[#BF1E21] h-5 w-5 rounded-full" />
              <div>Feed</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#00B0F0] h-5 w-5 rounded-full" />
              <div>Rejects</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#FF9A00] h-5 w-5 rounded-full" />
              <div>Accepts</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#8B3EC5] h-5 w-5 rounded-full" />
              <div>By Customer</div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div>Business Snapshot</div>
            <div className="text-orange-500">Recent Activity</div>
          </div>
        </div>
        <div className="h-full w-full relative mt-5">
          <Image src="/dashboard.png" alt="dashboard table" height={1000} width={1500} className="w-full h-full object-center object-fill" />

          {/* clickable | hydrapuler 10DR */}
          <div onClick={handleHydraPulerClick} className="absolute z-10 top-[32.9%] left-[25%] cursor-pointer w-[7.4%] h-[14.4%] rounded-[11%] hover:shadow-[0_0_8px_1px_red] transition-all duration-300">
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

