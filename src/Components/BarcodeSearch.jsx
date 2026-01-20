import React, { useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Loader from "./Loader";

const BarcodeSearch = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchProduct = async () => {
    if (!barcode) {
      setError("Please enter a barcode");
      return;
    }

    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      );

      if (response.data.status === 1) {
        setProduct(response.data.product);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center bg-gray-200 rounded-full py-3 px-6 gap-2 w-full">
        <input
          className="border-none focus:outline-none rounded-sm p-1 flex-grow"
          type="text"
          placeholder="Enter barcode..."
          value={barcode}
          onChange={(e) => {
            const value = e.target.value;
            setBarcode(value);
            if (value.trim() === "") {
              setProduct(null);
              setError("");
            }
          }}
          onKeyPress={(e) => e.key === "Enter" && searchProduct()}
        />
        <button className="flex-shrink-0">
          <IoIosSearch
            onClick={searchProduct}
            className="text-3xl p-1 rounded-full w-9 h-9 cursor-pointer"
          />
        </button>
      </div>

      {/* Product Card Modal - Positioned absolutely */}
      {(product || loading || error) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-96 max-w-full mx-4">
            {/* Close Button */}
            <div className="flex justify-end p-4 border-b">
              <button
                onClick={() => {
                  setProduct(null);
                  setError("");
                  setBarcode("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading && (
                <div className="flex justify-center items-center">
                  <p className="text-gray-700 font-semibold">Loading...</p>
                </div>
              )}

              {error && (
                <p className="text-red-600 font-semibold text-center">
                  {error}
                </p>
              )}

              {product && (
                <div>
                  <h3 className="font-bold text-lg mb-3">
                    {product.product_name || "No name available"}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Brand:</strong> {product.brands || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Category:</strong> {product.categories || "N/A"}
                  </p>

                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeSearch;
