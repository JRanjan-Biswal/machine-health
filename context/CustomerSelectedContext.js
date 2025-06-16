'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CustomerSelectedContext = createContext();

export function CustomerSelectedProvider({ children }) {
    const [customerSelected, setCustomerSelected] = useState(null);

    const handleCustomerSelected = useCallback((customer) => {
        setCustomerSelected(customer);
    }, []);

    // initially checcks for persisted client id | add to the store if any
    useEffect(() => {
        const persistedClientId = localStorage.getItem("clientId");
        if (persistedClientId) setCustomerSelected(persistedClientId);
    }, []);

    return (
        <CustomerSelectedContext.Provider value={{ customerSelected, handleCustomerSelected }}>
            {children}
        </CustomerSelectedContext.Provider>
    );
}

export function useCustomerSelected() {
    const context = useContext(CustomerSelectedContext);
    if (!context) {
        throw new Error('useCustomerSelected must be used within a CustomerSelectedProvider');
    }
    return context;
}
