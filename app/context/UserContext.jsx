"use client";

import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ authors: false, series: false, isbn: false });
  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
  
      const storedBooks = localStorage.getItem("filteredBooks");
      setFilteredBooks(storedBooks && storedBooks !== "undefined" ? JSON.parse(storedBooks) : []);
  
      const storedFilters = localStorage.getItem("filters");
      setFilters(storedFilters && storedFilters !== "undefined" ? JSON.parse(storedFilters) : { authors: false, series: false, isbn: false });
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setUser(null);
      setFilteredBooks([]);
      setFilters({ authors: false, series: false, isbn: false });
    }
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
