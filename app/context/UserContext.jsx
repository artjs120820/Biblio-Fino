"use client";

import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ authors: false, genero: false, isbn: false });
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);

      const storedBooks = localStorage.getItem("filteredBooks");
      setFilteredBooks(storedBooks ? JSON.parse(storedBooks) : []);

      const storedFilters = localStorage.getItem("filters");
      setFilters(storedFilters ? JSON.parse(storedFilters) : { authors: false, genero: false, isbn: false });
    } catch (error) {
      console.error("Error al cargar datos desde localStorage:", error);
      setUser(null);
      setFilteredBooks([]);
      setFilters({ authors: false, genero: false, isbn: false });
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const updateFilteredBooks = (books) => {
    setFilteredBooks(books);
    localStorage.setItem("filteredBooks", JSON.stringify(books));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, filters, updateFilters, filteredBooks, updateFilteredBooks }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
