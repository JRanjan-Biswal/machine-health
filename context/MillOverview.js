'use client';
import { createContext, useCallback, useContext, useState } from 'react';

const MillOverView = createContext();

export function MillOverViewProvider({ children }) {

    const [millOverViewPopShow, setMillOverViewPopShow] = useState(true);

    const showMillOverViewPopup = useCallback(() => {
        setMillOverViewPopShow(true);
    }, []);

    const hideMillOverViewPopup = useCallback(() => {
        setMillOverViewPopShow(false);
        localStorage.setItem('hideMillOverViewModal', true);
    }, []);

    return (
        <MillOverView.Provider value={{ millOverViewPopShow, setMillOverViewPopShow, showMillOverViewPopup, hideMillOverViewPopup }}>
            {children}
        </MillOverView.Provider>
    );
}

export function useMillOverView() {
    const context = useContext(MillOverView);
    if (!context) {
        throw new Error('useMillOverView must be used within a milloveviewpopup');
    }
    return context;
}
