import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCategoryFilter = ({
  allProducts,
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://world.openfoodfacts.org/categories.json",
        );
        setCategories(res.data.tags.slice(0, 20));
        setError("");
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Filter products locally based on selected category
  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => {
        const catTags = product.categories_tags || [];
        const categories = product.categories || "";
        const categoryName = selectedCategory
          .replace("en:", "")
          .toLowerCase()
          .trim();

        // Check if selected category is in categories_tags array
        if (Array.isArray(catTags)) {
          const match = catTags.some((tag) => {
            const tagLower = String(tag).toLowerCase().trim();
            return (
              tagLower === categoryName ||
              tagLower.includes(categoryName) ||
              categoryName.includes(tagLower.replace("en:", ""))
            );
          });
          if (match) return true;
        }

        // If categories is a string, check if it contains the category name
        if (typeof categories === "string") {
          return categories.toLowerCase().includes(categoryName);
        }

        return false;
      })
    : allProducts;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3">
          {error}
        </div>
      )}

      <select
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories ({allProducts.length})</option>
        {categories.map((cat) => {
          const count =
            selectedCategory === cat.id ? filteredProducts.length : 0;
          return (
            <option key={cat.id} value={cat.id}>
              {cat.name || cat.id.replace("en:", "")}
            </option>
          );
        })}
      </select>

      {selectedCategory && (
        <p className="text-sm text-gray-600 mt-3">
          Found <strong>{filteredProducts.length}</strong> products in this
          category
        </p>
      )}
    </div>
  );
};

export default ProductCategoryFilter;
