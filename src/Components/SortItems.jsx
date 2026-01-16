import React, { useState } from "react";

const SortItems = ({ products, onSortChange }) => {
  const [sortOption, setSortOption] = useState("default");

  const sortOptions = [
    { value: "default", label: "Sort By (Default)" },
    { value: "name-asc", label: "Product Name (A-Z)" },
    { value: "name-desc", label: "Product Name (Z-A)" },
    { value: "nutrition-asc", label: "Nutrition Grade (A to E)" },
    { value: "nutrition-desc", label: "Nutrition Grade (E to A)" },
  ];

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    if (products && products.length > 0 && onSortChange) {
      let sortedProducts = [...products];

      if (selectedOption === "name-asc") {
        sortedProducts.sort((a, b) => {
          const nameA = (
            a.product_name ||
            a.product_name_en ||
            ""
          ).toLowerCase();
          const nameB = (
            b.product_name ||
            b.product_name_en ||
            ""
          ).toLowerCase();
          return nameA.localeCompare(nameB);
        });
      } else if (selectedOption === "name-desc") {
        sortedProducts.sort((a, b) => {
          const nameA = (
            a.product_name ||
            a.product_name_en ||
            ""
          ).toLowerCase();
          const nameB = (
            b.product_name ||
            b.product_name_en ||
            ""
          ).toLowerCase();
          return nameB.localeCompare(nameA);
        });
      } else if (selectedOption === "nutrition-asc") {
        sortedProducts.sort((a, b) => {
          const gradeA = (a.nutrition_grades || "Z").toLowerCase();
          const gradeB = (b.nutrition_grades || "Z").toLowerCase();
          return gradeA.localeCompare(gradeB);
        });
      } else if (selectedOption === "nutrition-desc") {
        sortedProducts.sort((a, b) => {
          const gradeA = (a.nutrition_grades || "Z").toLowerCase();
          const gradeB = (b.nutrition_grades || "Z").toLowerCase();
          return gradeB.localeCompare(gradeA);
        });
      } else {
        sortedProducts = [...products];
      }

      onSortChange(sortedProducts);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">🔀</span>
          Sort Products
        </h3>

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg text-sm font-medium text-gray-700 bg-white cursor-pointer transition-all duration-200 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortItems;
