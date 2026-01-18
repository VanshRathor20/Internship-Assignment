import React, { useState } from "react";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const SortItems = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value); // Notify parent component of the sort change
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <HiMiniArrowsUpDown className="text-2xl mr-2" />
          Sort Products
        </h3>

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg text-sm font-medium text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Sort By (Default)</option>
          <option value="name-asc">Product Name (A-Z)</option>
          <option value="name-desc">Product Name (Z-A)</option>
          <option value="nutrition-asc">Nutrition Grade (A-E)</option>
          <option value="nutrition-desc">Nutrition Grade (E-A)</option>
        </select>
      </div>
    </div>
  );
};

export default SortItems;
