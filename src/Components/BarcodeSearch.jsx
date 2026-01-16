import React, { useState } from "react";
import axios from "axios";

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
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
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
    <div>
      <h2>Barcode Product Search</h2>

      <input
        type="text"
        placeholder="Enter barcode Number..."
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />

      <button onClick={searchProduct}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {product && (
        <div>
          <h3>{product.product_name || "No name available"}</h3>
          <p>
            <strong>Brand:</strong> {product.brands}
          </p>
          <p>
            <strong>Category:</strong> {product.categories}
          </p>

          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.product_name}
              width="150"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BarcodeSearch;
