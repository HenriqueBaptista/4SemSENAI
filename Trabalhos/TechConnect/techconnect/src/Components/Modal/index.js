import React, { useEffect } from 'react';
import { IoClose } from "react-icons/io5";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div 
                className="relative bg-primary-gray lg:w-[750px] p-8 rounded-3xl 
                            transform transition-transform duration-300 ease-in-out 
                            translate-x-full" 
                style={{ animation: 'slide-in 0.5s forwards' }} 
            >
                {/* Botão de fechar */}
                <button
                    className="absolute top-4 right-4 z-50 text-primary-white md:mt-2 px-2"
                    onClick={onClose}
                >
                    <IoClose size="32" />
                </button>

                {/* Conteúdo do modal */}
                {children}
            </div>
        </div>
    );
};
