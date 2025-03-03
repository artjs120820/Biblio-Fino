"use client";
import { useState } from "react";
import SearchPage from "./components/busqueda_components/Busqueda";
import ResultsPage from "./components/busqueda_components/Resultados";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    authors: false,
    series: false,
    isbn: false,
  });
  const [showResults, setShowResults] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
    setFilters({ authors: false, series: false, isbn: false });
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="p-8">
      {showResults ? (
        <ResultsPage onBack={handleBack} filters={filters} searchTerm={searchTerm} />
      ) : (
        <SearchPage
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          handleClear={handleClear}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
}

