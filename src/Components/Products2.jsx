import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Products2 = () => {
  const [userData, setUserData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      setLoading(true);
      const url =
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page=" +
        currentPage +
        "&json=true";

      const response = await axios.get(url);
      const products = response.data.products || [];

      if (products.length === 0) {
        setHasMore(false);
      } else {
        setUserData([...userData, ...products]);
        setDisplayedData([...displayedData, ...products]);
        setCurrentPage(currentPage + 1);
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setHasMore(false);
    }
  }

  const fetchMoreData = () => {
    // Fetch more products when user scrolls to bottom
    if (hasMore && !loading) {
      getUserData();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-8 flex justify-center align-items-center">Products</h2>

      <InfiniteScroll
        dataLength={displayedData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-center py-6">
            <h4 className="text-lg font-semibold text-gray-600">
              Loading products...
            </h4>
          </div>
        }
        endMessage={
          <div className="text-center py-6">
            <p className="text-gray-600 font-semibold">
              No more products to load
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {displayedData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">
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
                  <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                    {item.nutrition_grades.toUpperCase()}
                  </span>
                </p>
              )}

              {item.image_front_url && (
                <img
                  src={item.image_front_url}
                  alt={item.product_name}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products2;
