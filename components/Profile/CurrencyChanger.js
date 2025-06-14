import { useCurrency } from "@/context/CurrencyContext";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";

const CurrencyChanger = () => {
    const { selectedCurrency, updateCurrency, currencyValue } = useCurrency();
    const [currencyVal, setCurrencyVal] = useState(currencyValue);

    const handleCurrencyChange = useCallback((currency, value) => {
        updateCurrency(currency, value);
        toast.success("Currency updated successfully"); 
    }, [updateCurrency, currencyValue]);

    return (
        <div className="my-3">
            <h2 className="text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px] mb-[10px]">Edit Currency</h2>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={selectedCurrency === 'INR'}
                            onChange={() => handleCurrencyChange('INR', currencyVal)}
                            className="w-5 h-5"
                        />
                        <span className="text-base font-bold">INR(₹)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={selectedCurrency === 'EURO'}
                            onChange={() => handleCurrencyChange('EURO', currencyVal)}
                            className="w-5 h-5"
                        />
                        <span className="text-base font-bold">EURO(€)</span>
                    </label>
                </div>
                <div className="flex flex-row gap-2 items-center relative">
                    <span className="text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px]">1 Euro = </span>
                    <div className="relative">
                        <Input
                            type="number"
                            value={currencyVal}
                            onChange={(e) => setCurrencyVal(e.target.value)}
                            className="w-[150px] text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-[#2D3E5C] text-[18px] font-bold font-lato leading-[34px] absolute right-[6px] top-0">INR</span>
                    </div>
                </div>
                <button
                    onClick={() => handleCurrencyChange(selectedCurrency, currencyVal)}
                    className="w-full px-4 py-2 bg-[#2D3E5C] text-white text-base font-semibold font-montserrat rounded-md hover:bg-[#1F2937] transition-colors duration-200"
                >
                    Update Currency
                </button>
            </div>
        </div>
    )
}

export default CurrencyChanger;