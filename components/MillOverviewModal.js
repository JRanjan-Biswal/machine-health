'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const MillOverviewModal = ({ handleShowModal }) => {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState({
    name: "",
    powerCost: {
      value: '',
      priceUnit: '',
      perUnit: '',
    },
    fiberCost: {
      value: '',
      priceUnit: '',
      perUnit: '',
    },
    capacity: "",
    location: "",
    endProduct: "",
  });

  const [clients, setClients] = useState([]);

  const handleSelectCompany = (e) => {
    const selectedClient = clients.find(client => client._id === e.target.value);
    if (!selectedClient) return;
    setSelectedCompany({
      name: selectedClient.name,
      powerCost: selectedClient.powerCost,
      fiberCost: selectedClient.fiberCost,
      capacity: selectedClient.capacity,
      location: selectedClient.location,
      endProduct: selectedClient.endProduct,
    });
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        setClients(data.data.clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }

    fetchClients();
  }, []);
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
              value={selectedCompany._id}
              onChange={handleSelectCompany}
            >
              <option value="">Select Company</option>
              {
                clients.map((client) => (
                  <option key={client._id} value={client._id}>{client.name}</option>
                ))
              }
            </select>
            <Image src="/icon.png" alt="Dropdown" width={24} height={24}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none -rotate-90"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-gray-700">Power Cost</label>
            <div className="relative">
              <input
                readOnly
                type="text"
                value={selectedCompany.powerCost.value}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat(undefined, { style: 'currency', currency: selectedCompany.powerCost.priceUnit || 'EUR' }).format(0).slice(0, 1)}/{selectedCompany.powerCost.perUnit}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-gray-700">Fiber Cost</label>
            <div className="relative">
              <input
                readOnly
                type="text"
                value={selectedCompany.fiberCost.value}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {
                selectedCompany.fiberCost.value && selectedCompany.fiberCost.priceUnit && selectedCompany.fiberCost.perUnit &&
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat(undefined, { style: 'currency', currency: selectedCompany.fiberCost.priceUnit || 'EUR' }).format(0).slice(0, 1)}/{selectedCompany.fiberCost.perUnit}
                  </span>
                </div>
              }
            </div>

          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Capacity : {selectedCompany.capacity}</p>
          <p className="font-semibold text-gray-700">Location : {selectedCompany.location.address}</p>
          <p className="font-semibold text-gray-700">End Product : {selectedCompany.endProduct}</p>
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
