import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
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
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedText}&json=true`
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

        <div className="w-full md:w-auto">
          <BarcodeSearch />
        </div>
      </div>

      {/* Results Container */}
      <div className="flex flex-col gap-4">
        {loading && <p className="text-white font-semibold">Loading...</p>}

        {filteredProducts.length > 0 && (
          <div className="bg-white rounded-lg p-4">
            <ul className="space-y-4">
              {filteredProducts.map((item) => (
                <li
                  key={item.id}
                  className="text-gray-800 p-4 border-b last:border-b-0"
                >
                  <h3 className="font-bold text-lg mb-2">
                    {item.product_name ||
                      item.product_name_en ||
                      "Unknown Product"}
                  </h3>

                  <div className="flex flex-col md:flex-row gap-4">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="w-24 h-24 rounded object-cover"
                      />
                    )}

                    <div className="flex-1">
                      {item.brands && (
                        <p className="text-gray-700">
                          <strong>Brand:</strong> {item.brands}
                        </p>
                      )}
                      {item.categories && (
                        <p className="text-gray-700 mt-2">
                          <strong>Category:</strong> {item.categories}
                        </p>
                      )}
                      {item.nutrition_grades && (
                        <p className="text-gray-700 mt-2">
                          <strong>Nutrition Grade:</strong>{" "}
                          <span className="font-bold text-lg">
                            {item.nutrition_grades}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
