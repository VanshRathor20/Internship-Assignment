import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import BarcodeSearch from "./BarcodeSearch";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [loading, setLoading] = useState(false);

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
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedText}&json=true`,
      )
      .then((response) => {
        setProducts(response.data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [debouncedText]);

  // No need to filter - API already returns filtered results
  const filteredProducts = products;

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      {/* Search Inputs Container */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-4">
        <div className="flex justify-between items-center bg-gray-200 rounded-full py-3 px-6 w-full md:w-auto">
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

        <div className="w-full md:w-auto flex gap-20 justify-between items-center">
          <BarcodeSearch />
        </div>
      </div>

      {/* Results Container */}
      <div className="flex flex-col gap-4">
        {loading && <p className="text-white font-semibold">Loading...</p>}

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
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
