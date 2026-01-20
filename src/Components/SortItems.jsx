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
    <div className="w-full">
      <div className="flex items-center gap-2">
        <HiMiniArrowsUpDown className="text-2xl text-gray-600" />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="px-3 py-2 border-2 border-blue-400 rounded-lg text-sm font-medium text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-blue-500"
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
