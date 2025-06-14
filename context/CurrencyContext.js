'use client';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';

const CurrencySelector = createContext();

export function CurrencySelectorProvider({ children }) {
    const [currencySelectorShow, setCurrencySelectorShow] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('EURO');
    const [currencyValue, setCurrencyValue] = useState(97.44);

    useEffect(() => {
        // Load persisted currency settings from localStorage
        const savedCurrency = localStorage.getItem('selectedCurrency');
        const savedValue = localStorage.getItem('currencyValue');
        
        if (savedCurrency) {
            setSelectedCurrency(savedCurrency);
        }
        if (savedValue) {
            setCurrencyValue(parseFloat(savedValue));
        }
    }, []);

    const showCurrencySelector = useCallback(() => {
        setCurrencySelectorShow(true);
    }, []);

    const hideCurrencySelector = useCallback(() => {
        setCurrencySelectorShow(false);
        localStorage.setItem('hideCurrencySelectorModal', true);
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
