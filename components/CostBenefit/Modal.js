import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, children, blogContentClassName }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 400); // Increased duration for smoother exit
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-out bg-black/75 backdrop-blur-[5px] ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{ opacity: isOpen ? 0.5 : 0 }}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn("relative bg-white rounded-lg p-6 transform transition-all duration-500 ease-out",
                    isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95',
                    blogContentClassName
                )}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};  

export default Modal; 