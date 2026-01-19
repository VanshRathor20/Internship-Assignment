import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import SortItems from "./SortItems";
import Loader from "./Loader";

const Products2 = ({ onProductsLoaded, selectedCategory }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
    setUserData([]);
    setHasMore(true);
    setError("");
    getUserData();
    // eslint-disable-next-line
  }, []);

  async function getUserData() {
    try {
      setLoading(true);
      setError("");

      const url =
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page=" +
        currentPage +
        "&json=true";

      const response = await axios.get(url, { timeout: 30000 });
      const products = response.data.products || [];

      if (products.length === 0) {
        setHasMore(false);
        if (currentPage === 1) {
          setError("No products found");
        }
      } else {
        const newProducts =
          currentPage === 1 ? products : userData.concat(products);
        setUserData(newProducts);
        setCurrentPage((prev) => prev + 1);

        // Pass products to parent whenever they load
        if (onProductsLoaded) {
          onProductsLoaded(newProducts);
        }
      }

      setLoading(false);
    } catch (error) {
      const errorMsg =
        error.message === "timeout of 10000ms exceeded"
          ? "Request timeout. Please try again."
          : "Failed to load products. Check your connection.";

      setError(errorMsg);
      console.error("API error:", error);
      setLoading(false);

      if (currentPage === 1) {
        setHasMore(false);
      }
    }
  }

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      getUserData();
    }
  };

  // Filter products by category if selected
  const filteredData = selectedCategory
    ? userData.filter((product) => {
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
    : userData;

  const sortedData = useMemo(() => {
    let data = [...filteredData];

    switch (sortOption) {
      case "name-asc":
        return data.sort((a, b) =>
          (a.product_name || "").localeCompare(b.product_name || ""),
        );

      case "name-desc":
        return data.sort((a, b) =>
          (b.product_name || "").localeCompare(a.product_name || ""),
        );

      case "nutrition-asc":
        return data.sort((a, b) =>
          (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z"),
        );

      case "nutrition-desc":
        return data.sort((a, b) =>
          (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z"),
        );

      default:
        return data;
    }
  }, [filteredData, sortOption]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">Products</h2>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="max-w-5xl mx-auto mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* SORT COMPONENT */}
      {sortedData.length > 0 && (
        <div className="flex justify-center mb-6">
          <SortItems onSortChange={setSortOption} />
        </div>
      )}

      <InfiniteScroll
        dataLength={sortedData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          // <div className="text-center py-6">
          //   <h4 className="text-lg font-semibold text-gray-600">
          //     Loading products...
          //   </h4>
          // </div>
          <Loader />
        }
        endMessage={
          sortedData.length > 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 font-semibold">All products loaded</p>
            </div>
          ) : null
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sortedData.map((item, index) => (
            <Link
              key={index}
              to={`/product/${item.code}`}
              className="border mt-10 border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer hover:border-blue-400 transform hover:scale-105 duration-200 flex flex-col"
            >
              <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                {item.product_name || item.product_name_en || "Unknown Product"}
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
                    className={`px-3 py-1 rounded-lg font-bold ${
                      item.nutrition_grades.toUpperCase() === "UNKNOWN"
                        ? "bg-gray-400 text-gray-800"
                        : "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    }`}
                  >
                    {item.nutrition_grades.toUpperCase()}
                  </span>
                </p>
              )}

              {item.image_front_url && (
                <img
                  src={item.image_front_url}
                  alt={item.product_name}
                  className="w-full h-48 object-cover rounded-md flex-shrink-0"
                />
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 mt-auto">
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-semibold">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products2;
