'use client';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';

const CurrencySelector = createContext();

// Initialize state from localStorage
const getInitialState = () => {
    if (typeof window !== 'undefined') {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        const savedValue = localStorage.getItem('currencyValue');
        const hideModal = localStorage.getItem('hideCurrencySelectorModal');

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
