'use client';
import BusinessSnapshot from "@/components/Dashboard/BusinessSnapshot";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import MillOverviewModal from "@/components/MillOverviewModal";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuFactory } from "react-icons/lu";

const page = () => {
  const router = useRouter();

  const [showmodal, setshowmodal] = useState(true);
  const handleShowModal = () => setshowmodal(!showmodal);

  const [dropdownOpen, setDropdownOpen] = useState(false); // business | recent

  const toggleDropdown = (type) => setDropdownOpen((prev) => prev == type ? false : type);

  const handleHydraPulerClick = () => router.push('/stock-preparation');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        showmodal &&
        <div className="flex justify-center items-center w-full h-screen bg-black/75 p-5 backdrop-blur-[5px] absolute inset-0 z-100">
          <div className="absolute z-10">
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
        </div>
      }
      <div className="container h-[calc(100vh_-_260px)] mt-[20px] relative">
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

          <div className="flex gap-5 items-center relative">

            <div className={`${dropdownOpen == 'business' ? 'text-orange-500' : 'text-primary-blue'} flex items-center cursor-pointer gap-[5px]`}
              onClick={() => toggleDropdown('business')}
            >
              <LuFactory />
              <p>Business Snapshot</p>
            </div>

            <div className={`${dropdownOpen == 'recent' ? 'text-orange-500' : 'text-primary-blue'} flex items-center cursor-pointer gap-[5px]`}
              onClick={() => toggleDropdown('recent')}
            >
              <Image src="/clock-blue.svg" alt="notification" height={20} width={20} className={`${dropdownOpen != 'recent' ? 'block' : 'hidden'}`} />
              <Image src="/clock-oranage.svg" alt="notification" height={20} width={20} className={`${dropdownOpen == 'recent' ? 'block' : 'hidden'}`} />
              <p>Recent Activity</p>
            </div>
            {
              dropdownOpen == "business" && <div className="absolute top-12 right-0 z-10"><Modal isOpen={dropdownOpen == "business"} onClose={toggleDropdown}><BusinessSnapshot /></Modal></div>
            }

            {
              dropdownOpen == "recent" && <div className="absolute top-12 right-0 z-10"><Modal isOpen={dropdownOpen == "recent"} onClose={toggleDropdown}><RecentActivity /></Modal></div>
            }
          </div>

        </div>

        <div className="fixed top-[194px] h-[1px] w-full left-0 right-0 bg-primary-grey" />

        <div className="h-full w-full relative mt-9">
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

