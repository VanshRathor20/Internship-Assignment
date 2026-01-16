import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://world.openfoodfacts.org/categories.json")
      .then((res) => {
        setCategories(res.data.tags.slice(0, 20));
      })
      .catch(() => setError("Failed to load categories"));
  }, []);

  // Fetch products
  useEffect(() => {
    const categorySlug = selectedCategory.replace("en:", "");

    const url = selectedCategory
      ? `https://world.openfoodfacts.org/category/${categorySlug}.json`
      : `https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&json=1`;

    axios
      .get(url)
      .then((res) => setProducts(res.data.products.slice(0, 10)))
      .catch(() => setError("Failed to load products"));
  }, [selectedCategory]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* CATEGORY DROPDOWN */}
      <select
        className="w-full border px-3 py-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name || cat.id.replace("en:", "")}
          </option>
        ))}
      </select>

      {/* PRODUCTS */}
      <ul className="mt-4 space-y-2">
        {products.map((item, index) => (
          <li key={index} className="border p-2 rounded">
            <p className="font-semibold">{item.product_name || "No name"}</p>
            <p className="text-sm text-gray-500">{item.categories || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategoryFilter;
