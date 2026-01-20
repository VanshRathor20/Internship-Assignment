import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import BarcodeSearch from "./BarcodeSearch";
import SortItems from "./SortItems";
import Loader from "./Loader";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  //  Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Fetch data using Axios only when debounced text changes
  useEffect(() => {
    if (!debouncedText.trim()) {
      setProducts([]);
      setSortedProducts([]);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedText}&json=true`,
      )
      .then((response) => {
        const data = response.data.products || [];
        setProducts(data);
        applySorting(data, sortOption);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [debouncedText]);

  // Handle sort changes
  const handleSortChange = (option) => {
    setSortOption(option);
    applySorting(products, option);
  };

  const applySorting = (data, option) => {
    let sorted = [...data];

    switch (option) {
      case "name-asc":
        sorted.sort((a, b) =>
          (a.product_name || "").localeCompare(b.product_name || ""),
        );
        break;
      case "name-desc":
        sorted.sort((a, b) =>
          (b.product_name || "").localeCompare(a.product_name || ""),
        );
        break;
      case "nutrition-asc":
        sorted.sort((a, b) =>
          (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z"),
        );
        break;
      case "nutrition-desc":
        sorted.sort((a, b) =>
          (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z"),
        );
        break;
      default:
        sorted = data;
    }

    setSortedProducts(sorted);
  };

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      {/* Search Inputs Container - All in one line and responsive */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 flex-wrap">
        {/* Search Bar */}
        <div className="flex justify-between items-center bg-gray-200 rounded-full py-3 px-6 w-full sm:w-auto lg:flex-1 lg:min-w-0">
          <input
            className="border-none focus:outline-none rounded-sm p-1 flex-grow"
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && setDebouncedText(searchText)
            }
          />
          <IoIosSearch className="text-3xl p-1 rounded-full w-9 h-9 cursor-pointer ml-2 flex-shrink-0" />
        </div>

        {/* Barcode Search */}
        <div className="w-full sm:w-auto lg:flex-1 lg:min-w-0">
          <BarcodeSearch />
        </div>

        {/* Sort Items */}
        <div className="w-full sm:w-auto lg:flex-1 lg:min-w-0">
          <SortItems onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Results Container */}
      <div className="flex flex-col gap-4">
        {
          loading ? (
            <Loader />
          ) : null
        // loading && <p className="text-black font-semibold">Loading...</p>
        }

        {sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.code}`}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer hover:border-blue-400 transform hover:scale-105 duration-200 flex flex-col"
              >
                <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                  {item.product_name ||
                    item.product_name_en ||
                    "Unknown Product"}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Brand:</strong> {item.brands || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  <strong>Category:</strong> {item.categories || "N/A"}
                </p>

                {item.nutrition_grades && (
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Nutrition Grade:</strong>{" "}
                    <span
                      className={`inline-block font-bold px-3 py-1 rounded-lg ${
                        item.nutrition_grades.toUpperCase() === "UNKNOWN"
                          ? "bg-gray-400 text-gray-800"
                          : item.nutrition_grades.toUpperCase() ===
                              "NOT-APPLICABLE"
                            ? "bg-yellow-400 text-gray-800"
                            : "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      }`}
                    >
                      {item.nutrition_grades.toUpperCase()}
                    </span>
                  </p>
                )}

                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-full h-48 object-cover rounded-md flex-shrink-0 mb-4"
                  />
                )}

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-semibold">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
