'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useHeader } from "@/context/HeaderContext";

const BusinessSnapshot = ({ clientData }) => {
    const router = useRouter();
    const [selectedClient, setSelectedClient] = useState(clientData?.[0] || null);

    const { animateHeaderShow } = useHeader();
    const [formData, setFormData] = useState({
        capacity: '',
        dailyRunningHours: {
            value: '',
            unit: 'hours'
        },
        powerCost: {
            value: '',
            priceUnit: 'EUR',
            perUnit: 'kWh'
        },
        fiberCost: {
            value: '',
            priceUnit: 'EUR',
            perUnit: 'ton'
        }
    });

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        // Set initial client from localStorage if available
        const storedClientId = localStorage.getItem("clientId");

        // if (storedClientId && clientData) {
        if (clientData) {
            const client = clientData.find(c => c._id === "68436859af3221a4b1df84f1");
          
            if (client) {
                setSelectedClient(client);
                setFormData({
                    capacity: client.capacity || '',
                    dailyRunningHours: {
                        value: client.dailyRunningHours?.value || '',
                        unit: client.dailyRunningHours?.unit || 'hours'
                    },
                    powerCost: {
                        value: client.powerCost?.value || '',
                        priceUnit: client.powerCost?.priceUnit || 'EUR',
                        perUnit: client.powerCost?.perUnit || 'kWh'
                    },
                    fiberCost: {
                        value: client.fiberCost?.value || '',
                        priceUnit: client.fiberCost?.priceUnit || 'EUR',
                        perUnit: client.fiberCost?.perUnit || 'ton'
                    }
                });
            }
        }
    }, [clientData]);

    const handleInputChange = (field, value, subField = null) => {
        setFormData(prev => {
            if (subField) {
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [subField]: value
                    }
                };
            }
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const handleUpdate = async () => {
        // Validate if a client is selected
        if (!selectedClient) {
            toast.error('Please select a client first', { color: '#1d1d1d' });
            return;
        }

        // Validate required fields
        if (!formData.capacity || !formData.dailyRunningHours.value) {
            toast.error('Please ensure all required fields are filled', { color: '#1d1d1d' });
            return;
        }

        try {
            // Store the selected client ID in localStorage
            localStorage.setItem("clientId", selectedClient._id);

            // Show success message
            toast.success('Successfully updated client information', { color: '#1d1d1d' });

            // Navigate to dashboard
            router.push('/facility');
        } catch (error) {
            toast.error('Failed to update client information', { color: '#1d1d1d' });
        }
    };

    return (
        <div className="w-full max-w-xs bg-[#2d3e5c] rounded-md shadow-lg">
            {/* Header Section */}
            <div className="bg-[#222e45] rounded-t-md">
                <h1 className="text-2xl font-bold text-white font-lato p-4">Business Snapshot</h1>
            </div>

            <div className={`overflow-y-auto transition-all duration-300 ${!animateHeaderShow ? 'h-[calc(100vh-115px)]' : 'h-[calc(100vh-195px)]'}`}>
                {/* Info Grid Section */}
                {/* Info Grid Section */}
                <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[#dfe6ec] text-lg font-bold font-lato">End Product</p>
                        <p className="text-[#dfe6ec] text-base font-lato">{selectedClient?.endProduct || "NIL"}</p>
                    </div>
                    <div>
                        <p className="text-[#dfe6ec] text-lg font-bold font-lato">Location</p>
                        <p className="text-[#dfe6ec] text-base font-lato">{selectedClient?.location?.address || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[#dfe6ec] text-lg font-bold font-lato">Last Service</p>
                        <p className="text-[#dfe6ec] text-base font-lato">
                            {selectedClient?.lastVisited ? new Date(selectedClient.lastVisited).toLocaleDateString('en-GB') : "NIL"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#dfe6ec] text-lg font-bold font-lato">Next Service</p>
                        <p className="text-[#dfe6ec] text-base font-lato">
                            {selectedClient?.nextScheduledVisit ? new Date(selectedClient.nextScheduledVisit).toLocaleDateString('en-GB') : "NIL"}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-[#3d537b] my-4"></div>

                {/* Line Details Section */}
                <div className="px-4">
                    <h2 className="text-xl font-bold text-white font-lato mb-6">
                        Line details:
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[#dfe6ec] text-base font-medium font-lato mb-2">
                                Capacity of Line
                            </p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.capacity}
                                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                                    className="w-full p-2 bg-transparent text-white rounded-md border border-[#607797] focus:outline-none focus:border-[#d45815]"
                                    placeholder="Enter capacity"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-[#dfe6ec]">TPD</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#dfe6ec] text-base font-medium font-lato mb-2">
                                Daily running Hours
                            </p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.dailyRunningHours.value}
                                    onChange={(e) => handleInputChange('dailyRunningHours', e.target.value, 'value')}
                                    className="w-full p-2 bg-transparent text-white rounded-md border border-[#607797] focus:outline-none focus:border-[#d45815]"
                                    placeholder="Enter hours"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-[#dfe6ec]">Hrs</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#dfe6ec] text-base font-medium font-lato mb-2">
                                Power Cost
                            </p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.powerCost.value}
                                    onChange={(e) => handleInputChange('powerCost', e.target.value, 'value')}
                                    className="w-full p-2 bg-transparent text-white rounded-md border border-[#607797] focus:outline-none focus:border-[#d45815]"
                                    placeholder="Enter cost"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-[#dfe6ec]">
                                        {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' }).format(0).slice(0, 1)}/kWhr
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#dfe6ec] text-base font-medium font-lato mb-2">
                                Fiber Cost
                            </p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.fiberCost.value}
                                    onChange={(e) => handleInputChange('fiberCost', e.target.value, 'value')}
                                    className="w-full p-2 bg-transparent text-white rounded-md border border-[#607797] focus:outline-none focus:border-[#d45815]"
                                    placeholder="Enter cost"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-[#dfe6ec]">
                                        {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' }).format(0).slice(0, 1)}/Ton
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="mt-8 pb-4 w-full flex justify-center">
                        <button
                            className="w-full bg-[#d45815] text-white py-3 px-6 rounded-md font-bold text-base font-montserrat hover:bg-[#c24d12] transition-colors"
                            onClick={handleUpdate}
                        >
                            Update & Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSnapshot;