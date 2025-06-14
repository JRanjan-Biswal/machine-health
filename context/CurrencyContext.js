'use client';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';

const CurrencySelector = createContext();

// Initialize state from localStorage
const getInitialState = () => {
    if (typeof window !== 'undefined') {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        const savedValue = localStorage.getItem('currencyValue');
        const hideModal = localStorage.getItem('hideCurrencySelectorModal');

        console.log('Initial state from localStorage:', { savedCurrency, savedValue });

        return {
            currencySelectorShow: hideModal !== 'true',
            selectedCurrency: savedCurrency || 'EURO',
            currencyValue: savedValue ? parseFloat(savedValue) : 97.44
        };
    }
    return {
        currencySelectorShow: true,
        selectedCurrency: 'EURO',
        currencyValue: 97.44
    };
};

export function CurrencySelectorProvider({ children }) {
    const initialState = getInitialState();
    const [currencySelectorShow, setCurrencySelectorShow] = useState(initialState.currencySelectorShow);
    const [selectedCurrency, setSelectedCurrency] = useState(initialState.selectedCurrency);
    const [currencyValue, setCurrencyValue] = useState(initialState.currencyValue);

    // Listen for changes in localStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'selectedCurrency') {
                setSelectedCurrency(e.newValue || 'EURO');
            }
            if (e.key === 'currencyValue') {
                setCurrencyValue(e.newValue ? parseFloat(e.newValue) : 97.44);
            }
        };

        // Add event listener
        window.addEventListener('storage', handleStorageChange);

        // Also check for changes in the current window
        const checkLocalStorage = () => {
            const currentCurrency = localStorage.getItem('selectedCurrency');
            const currentValue = localStorage.getItem('currencyValue');
            
            if (currentCurrency && currentCurrency !== selectedCurrency) {
                setSelectedCurrency(currentCurrency);
            }
            if (currentValue && parseFloat(currentValue) !== currencyValue) {
                setCurrencyValue(parseFloat(currentValue));
            }
        };

        // Check immediately and set up an interval
        checkLocalStorage();
        const interval = setInterval(checkLocalStorage, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [selectedCurrency, currencyValue]);

    const showCurrencySelector = useCallback(() => {
        setCurrencySelectorShow(true);
        localStorage.removeItem('hideCurrencySelectorModal');
    }, []);

    const hideCurrencySelector = useCallback(() => {
        setCurrencySelectorShow(false);
        localStorage.setItem('hideCurrencySelectorModal', 'true');
    }, []);

    const updateCurrency = useCallback((currency, value) => {
        setSelectedCurrency(currency);
        setCurrencyValue(value);
        localStorage.setItem('selectedCurrency', currency);
        localStorage.setItem('currencyValue', value.toString());
    }, []);

    return (
        <CurrencySelector.Provider value={{ 
            currencySelectorShow, 
            setCurrencySelectorShow, 
            showCurrencySelector, 
            hideCurrencySelector,
            selectedCurrency,
            currencyValue,
            updateCurrency
        }}>
            {children}
        </CurrencySelector.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencySelector);
    if (!context) {
        throw new Error('useCurrencySelector must be used within a currencyselector');
    }
    return context;
}
