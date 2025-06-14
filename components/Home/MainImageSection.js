'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainImageSection = ({ userName = "Feroz", clientData }) => {
    const router = useRouter();
    const [selectedRegion, setSelectedRegion] = useState("");
    // const [selectedCustomer, setSelectedCustomer] = useState(clientData?.[0] || null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

    //   console.log(clientData);

    // Get unique regions from client data
    //   const regions = [...new Set(clientData?.map(client => client.location?.region) || ["India", "Europe", "South America"])].filter(Boolean);
    const regions = ["India", "Europe", "South America"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showRegionDropdown || showCustomerDropdown) {
                const regionDropdown = document.getElementById('region-dropdown');
                const customerDropdown = document.getElementById('customer-dropdown');

                if (!regionDropdown?.contains(event.target) && !customerDropdown?.contains(event.target)) {
                    setShowRegionDropdown(false);
                    setShowCustomerDropdown(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showRegionDropdown, showCustomerDropdown]);

    const handleDropdownClick = (type) => {
        if (type === 'region') {
            setShowRegionDropdown(!showRegionDropdown);
            setShowCustomerDropdown(false);
        } else {
            setShowCustomerDropdown(!showCustomerDropdown);
            setShowRegionDropdown(false);
        }
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setShowRegionDropdown(false);
        // Filter customers based on selected region
        const filteredCustomers = clientData?.filter(client => client.location?.region === region);
        if (filteredCustomers?.length > 0) {
            setSelectedCustomer(filteredCustomers[0]);
            localStorage.setItem("clientId", filteredCustomers[0]._id);
        }
    };

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
        setShowCustomerDropdown(false);
        localStorage.setItem("clientId", customer._id);
    };

    // Filter customers based on selected region
    // const filteredCustomers = selectedRegion
    //     ? clientData?.filter(client => client.location?.region === selectedRegion)
    //     : clientData;

    const filteredCustomers = selectedRegion === "India" ? clientData : ["", ""];

    return (
        <div className="flex flex-col h-full bg-inherit">
            {/* Welcome and Dropdown Section */}
            <div className="flex justify-between items-center px-8 py-4">
                <h1 className="text-[24px] font-black text-[#2d3e5c] font-lato">
                    Welcome, {userName}
                </h1>

                <div className="flex gap-4">
                    {/* Region Dropdown */}
                    <div className="relative" id="region-dropdown">
                        <button
                            className="flex items-center justify-between gap-4 px-4 py-2.5 border border-[#96a5ba] rounded-md hover:bg-gray-50 w-40"
                            onClick={() => handleDropdownClick('region')}
                        >
                            <span className="text-base font-semibold text-[#2d3e5c] font-lato">
                                {selectedRegion || 'Region'}
                            </span>
                            <svg
                                className={`h-4 w-4 transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showRegionDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-[#96a5ba] z-10 overflow-hidden w-full">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        className="w-full px-4 py-2 text-left text-[#2d3e5c] hover:bg-gray-200 font-lato"
                                        onClick={() => handleRegionSelect(region)}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Customer Dropdown */}
                    <div className="relative" id="customer-dropdown">
                        <button
                            className="flex items-center justify-between gap-4 px-4 py-2.5 border border-[#96a5ba] rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed w-56"
                            disabled={selectedRegion !== "India"}
                            onClick={() => handleDropdownClick('customer')}
                        >
                            <span className="text-base font-semibold text-[#2d3e5c] font-lato">
                                {selectedCustomer?.name || 'Customer'}
                            </span>
                            <svg
                                className={`h-4 w-4 transition-transform ${showCustomerDropdown ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showCustomerDropdown && (
                            <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-[#96a5ba] z-10 overflow-hidden">
                                {filteredCustomers?.map((customer) => (
                                    <button
                                        key={customer._id}
                                        className="w-full px-4 py-2 text-left text-[#2d3e5c] hover:bg-gray-200 font-lato"
                                        onClick={() => handleCustomerSelect(customer)}
                                    >
                                        {customer.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Facility Image */}
            <div className="h-full overflow-hidden">
                <Image
                    src="/home.png"
                    alt="Facility"
                    width={1519}
                    height={823}
                    className="object-cover h-full w-auto object-bottom-left"
                />
            </div>
        </div>
    );
};

export default MainImageSection;