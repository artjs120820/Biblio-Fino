"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Revert({ mensaje, visible, setVisible, onExit }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsRendered(true);
            document.body.classList.add("overflow-hidden");
            setIsClosing(false);
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [visible]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsRendered(false);
            setVisible(false);
        }, 300);
    };

    if (!isRendered) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999] rounded-[0.48rem]
                        ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-red-400 text-white px-6 py-4 rounded-lg shadow-lg text-center 
                            ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`}
                    >
                        <p className="mb-4">{mensaje}</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleClose}
                                className="bg-white text-red-500 px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
                            >
                                Volver
                            </button>
                            <button
                                onClick={onExit}
                                className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
                            >
                                Salir
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
