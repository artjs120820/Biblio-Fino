"use client";

import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ authors: false, series: false, isbn: false });
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedBooks = localStorage.getItem("filteredBooks");
    if (storedBooks) setFilteredBooks(JSON.parse(storedBooks));

    const storedFilters = localStorage.getItem("filters");
    if (storedFilters) setFilters(JSON.parse(storedFilters));
  }, []);

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
