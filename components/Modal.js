import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside the modal
        const handleClickOutside = (event) => {
            // If the modal is open and the click is outside the modal content
            if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Call the onClose function passed from the parent
            }
        };

        // Add event listener when the modal is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes

    if (!isOpen) {
        return null; // Don't render anything if the modal is not open
    }

    return (
        <div ref={modalRef}>
            {children}
        </div>
    );
};

export default Modal;