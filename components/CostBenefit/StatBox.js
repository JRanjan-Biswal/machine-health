import { useCurrency } from "@/context/CurrencyContext";
import { convertAndFormatWithContext } from "@/lib/currencyChange";

const StatsBox = ({ contentData }) => {

    const { selectedCurrency, currencyValue } = useCurrency();

    return (
        <div className="bg-[#e6eef5] rounded-md border border-[#cad9ed] mt-4 w-full max-w-[361px] ml-auto absolute top-0 right-4 shadow-custom-1">
            <div className="flex justify-center flex-col items-center py-4">
                <div className="text-[28px] font-bold text-[#ae2d2d]">
                    {convertAndFormatWithContext(contentData?.clientMachineSparePart?.totalLossCost?.value, { selectedCurrency, currencyValue })}
                </div>
                <div className="text-base text-[#ae2d2d]">Total Loss</div>
            </div>
            <div className="border-t border-[#cad9ed]">
                <div className="flex justify-between relative px-4">
                    <div className="flex flex-col py-4 w-1/2">
                        <span className="text-[#2d3e5c] font-bold text-xl text-center">
                            {convertAndFormatWithContext(contentData?.clientMachineSparePart?.totalFiberLossCost?.value, { selectedCurrency, currencyValue })}
                        </span>
                        <span className="text-[#607797] text-center">Fiber Loss</span>
                    </div>
                    <div className='h-full w-[1px] absolute left-1/2 top-0 bottom-0 bg-[#cad9ed]' />
                    <div className="border-[#cad9ed] flex flex-col py-4 w-1/2">
                        <span className="text-[#2d3e5c] font-bold text-xl text-center">
                            {convertAndFormatWithContext(contentData?.clientMachineSparePart?.totalPowerLossCost?.value, { selectedCurrency, currencyValue })}
                        </span>
                        <span className="text-[#607797] text-center">Power Loss</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsBox;