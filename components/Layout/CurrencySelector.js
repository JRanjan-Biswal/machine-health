import { useCurrency } from "@/context/CurrencyContext";
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils";

const CurrencySelector = () => {
    const { selectedCurrency, updateCurrency, currencyValue } = useCurrency();

    return (
        <div className="flex items-center gap-2">
            <span
                className={cn(
                    "text-[#2d3e5c] font-montserrat font-medium cursor-pointer",
                    selectedCurrency === 'EURO' ? 'opacity-40' : 'opacity-100'
                )}
                onClick={() => {
                    updateCurrency('INR', currencyValue);
                }}
            >
                INR
            </span>
            <Switch
                checked={selectedCurrency === 'EURO'}
                onCheckedChange={(checked) => {
                    updateCurrency(checked ? 'EURO' : 'INR', currencyValue);
                }}
            />
            <span
                className={cn(
                    "text-[#2d3e5c] font-montserrat font-medium cursor-pointer",
                    selectedCurrency === 'INR' ? 'opacity-40' : 'opacity-100'
                )}
                onClick={() => {
                    updateCurrency('EURO', currencyValue);
                }}
            >
                EURO
            </span>
        </div>
    )
}

export default CurrencySelector;