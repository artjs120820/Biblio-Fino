"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";

export default function LoginModal({ showLogin, setShowLogin }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (showLogin) {
      setIsRendered(true);
      document.body.classList.add("overflow-hidden");
      setIsClosing(false);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showLogin]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsRendered(false);
      setShowLogin(false);
      setShowRegister(false); 
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 
            ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-96 text-center relative border-2 
                ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`} 
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={handleClose}
        >
          <X size={24} />
        </button>

        {showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <LoginForm setShowRegister={setShowRegister} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}
