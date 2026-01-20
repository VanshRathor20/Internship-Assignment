import React, { useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
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
    <div className="w-full">
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

      {
        // <Loader />
        loading && (
          <p className="text-white font-semibold p-2 mt-2">Loading...</p>
        )
      }
      {error && <p className="text-red-600 font-semibold p-2 mt-2">{error}</p>}

      {product && (
        <div className="bg-white w-auto rounded-lg p-4 mt-4 border-none shadow-lg">
          <h3 className="font-bold text-lg">
            {product.product_name || "No name available"}
          </h3>
          <p className="text-gray-700 mt-2">
            <strong>Brand:</strong> {product.brands}
          </p>
          <p className="text-gray-700">
            <strong>Category:</strong> {product.categories}
          </p>

          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.product_name}
              width="150"
              className="mt-4 rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BarcodeSearch;
