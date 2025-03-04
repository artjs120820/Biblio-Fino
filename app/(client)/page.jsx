"use client";
import { useState } from "react";
import SearchPage from "./components/busqueda_components/Busqueda";
import ResultsPage from "./components/busqueda_components/Resultados";
const data = [
  {
    "Titulo": "El gato sin botas",
    "Autor(es)": "Autor 1",
    "Serie": "Serie 1",
    "ISBN13": "1202002",
    "Imagen": "https://i.blogs.es/8bddcc/650_1000_650_1000_minecraft/450_1000.jpg",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."
  },
  {
    "Titulo": "El zorro con botas",
    "Autor(es)": "Autor 2",
    "Serie": "Serie 2",
    "ISBN13": "4532112",
    "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyIQnUNMZQtAKSeXLQnkGFB_5Gx5AlM20Vg&s",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "El perro con chaqueta",
    "Autor(es)": "Autor 3",
    "Serie": "Serie 3",
    "ISBN13": "9876543",
    "Imagen": "https://via.placeholder.com/150",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "FDOtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://via.placeholder.com/150",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "DGDOtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://via.placeholder.com/150",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "2DFDFDOtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://via.placeholder.com/150",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "ODFDtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://articles.geekster.in/wp-content/uploads/2024/06/How-to-Connect-Tailwind-in-HTML-.jpg",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "223DFDOtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzg0DaCSOAnLTbkak5Un9NTFDjLL0wlHFmQ&s",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
  {
    "Titulo": "HFGFGFGFOtro libro más",
    "Autor(es)": "Autor 4",
    "Serie": "Serie 4",
    "ISBN13": "1122334",
    "Imagen": "https://via.placeholder.com/150",
    "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

  },
];
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    authors: false,
    series: false,
    isbn: false,
  });
  const [filteredResults, setFilteredResults] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
    setFilters({ authors: false, series: false, isbn: false });
  };

  const handleSearch = () => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const results = data.filter((book) => {
      const matchesTitle = book.Titulo.toLowerCase().includes(normalizedSearch);
      const matchesAuthor = filters.authors && book["Autor(es)"].toLowerCase().includes(normalizedSearch);
      const matchesSeries = filters.series && book.Serie.toLowerCase().includes(normalizedSearch);
      const matchesISBN = filters.isbn && book.ISBN13.includes(normalizedSearch);

      return matchesTitle || matchesAuthor || matchesSeries || matchesISBN;
    });

    setFilteredResults(results);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div >
      {showResults ? (
        <ResultsPage onBack={handleBack} filters={filters} data={filteredResults} />
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

