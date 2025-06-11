'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [animateHeaderShow, setAnimateHeaderShow] = useState(true);
    const [timerState, setTimer] = useState(null)

    const handleAnimatedHeader = useCallback(() => {
        const timer = setTimeout(() => {
            setAnimateHeaderShow(false)
        }, 2000);

        setAnimateHeaderShow(true);
        setTimer(timer)
        return () => clearTimeout(timer);
    }, []);

    const showAnimatedHeader = () => {
        clearTimeout(timerState);
        setAnimateHeaderShow(true);
    }

    const startAnimatedHeader = () => {
        handleAnimatedHeader()
    }

    return (
        <HeaderContext.Provider value={{ animateHeaderShow, setAnimateHeaderShow, handleAnimatedHeader, showAnimatedHeader, startAnimatedHeader }}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader() {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    return context;
}
