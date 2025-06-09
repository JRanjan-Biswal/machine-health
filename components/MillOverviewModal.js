'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";


const MillOverviewModal = ({
  customerName = 'Select Company',
  powerCost = '0.09 €/kwhr',
  fiberCost = '200 €/ton',
  capacity = '400 BDMTPD',
  location = 'Vapi, Gujarat, India',
  endProduct = 'Kraft Test Liner',
  handleShowModal
}) => {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(customerName);

  return (
    <div className="max-w-lg w-full bg-white rounded-2xl p-10 shadow-lg flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mill Overview</h1>
        <RxCross2 size={20} onClick={() => router.push("/")} className='cursor-pointer' />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Customer Name</label>
          <div className="relative dropdown-container">
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="Aryan Papers">Aryan Papers</option>
              <option value="Sri Andal Paper Mill">Sri Andal Paper Mill</option>
              <option value="GayatriShakti Papers & Boards Ltd.">GayatriShakti Papers & Boards Ltd.</option>
              <option value="Lemit Papers LLP">Lemit Papers LLP</option>
            </select>
            <Image
              src="/icon.png"
              alt="Dropdown"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none -rotate-90"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-gray-700">Power Cost</label>
            <input
              type="text"
              value={powerCost}
              className="w-full p-3 border border-gray-300 rounded-md"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-gray-700">Fiber Cost</label>
            <input
              type="text"
              value={fiberCost}
              className="w-full p-3 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Capacity : {capacity}</p>
          <p className="font-semibold text-gray-700">Location : {location}</p>
          <p className="font-semibold text-gray-700">End Product : {endProduct}</p>
        </div>

        <hr className="border-t border-gray-200" />

        <button className="w-full cursor-pointer p-3 bg-gray-800 text-white rounded-md font-bold hover:bg-gray-700" onClick={() => handleShowModal()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MillOverviewModal;
