"use client"
import { useState, useEffect, createContext, useContext } from "react";
import tokenApi from "../api/token";

const TokenContext = createContext();

export function TokenProvider({ children }) {
    const [tokenData, setTokenData] = useState(null);
    const cerrarSesion = async () => {
        try {
            const token = getCookie("sessionToken");
            if (!token) {
                console.warn("No hay token disponible para cerrar sesión");
                return;
            }

            const response = await tokenApi.cerrarSesion(token);

            if (response?.status === 200) {
                console.log("Sesión cerrada correctamente");
                document.cookie = "sessionToken=; path=/; max-age=0";
                setTokenData(null);
            } else {
                console.error("Error al cerrar sesión:", response?.data?.message || "Error desconocido");
            }
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };


    const getCookie = (name) => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return value;
            }
        }
        return null;
    };
    const fetchToken = async () => {
        try {
            const token = getCookie("sessionToken");
            if (!token) {
                console.warn("No se encontró el token en las cookies");
                return;
            }
            const response = await tokenApi.tokenSession(token);
            if (response?.status === 200) {
                console.log("Token recibido:", response.data.ciudadano);
                setTokenData(response.data.ciudadano);
            } else {
                console.error("Error al obtener el token:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo el token:", error);
        }
    };

    useEffect(() => {
        fetchToken();
    }, []);

    return (
        <TokenContext.Provider value={{ tokenData, cerrarSesion }}>
            {children}
        </TokenContext.Provider>
    );
}
export function useToken() {
    return useContext(TokenContext);
}

