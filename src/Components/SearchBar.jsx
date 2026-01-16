import React, { useEffect, useState } from "react";
import axios from "axios";

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
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedText}&json=true`)
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
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {filteredProducts.map((item) => (
          <li key={item.id}>
            {item.product_name || item.product_name_en || "Unknown Product"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
