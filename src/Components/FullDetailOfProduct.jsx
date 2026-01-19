import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import Loader from "./Loader";

const FullDetailOfProduct = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Try to fetch using barcode first
        let response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
        );

        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProductDetails();
    }
  }, [barcode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
          >
            <IoIosArrowBack size={20} className="cursor-pointer" /> Back to
            Products
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
            <p className="font-semibold"> {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
          >
            <IoIosArrowBack size={20} className="cursor-pointer" /> Back to
            Products
          </button>
          <p className="text-center text-gray-600">No product data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
        >
          <IoIosArrowBack size={20} className="cursor-pointer" /> Back to
          Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left: Product Image */}
            <div className="flex flex-col items-center justify-center">
              {product.image_front_url ? (
                <img
                  src={product.image_front_url}
                  alt={product.product_name || "Product"}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {product.product_name || "Unknown Product"}
                </h1>
                <p className="text-gray-600">
                  <strong>Brand:</strong> {product.brands || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Barcode:</strong> {product.code || "N/A"}
                </p>
              </div>

              {/* Nutrition Grade */}
              {product.nutrition_grades && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-gray-700 mb-2">
                    <strong>Nutrition Grade:</strong>
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-6 py-3 rounded-lg font-bold text-2xl ${
                        product.nutrition_grades.toUpperCase() === "UNKNOWN"
                          ? "bg-gray-400 text-gray-800"
                          : "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      }`}
                    >
                      {product.nutrition_grades.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {/* Labels/Tags */}
              {product.labels && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Labels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.labels.split(",").map((label, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        <TiTick size={16} className="inline mr-1" />{" "}
                        {label.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              {product.categories && (
                <div>
                  <p className="text-gray-700">
                    <strong>Category:</strong> {product.categories}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Nutritional Values */}
          {product.nutriments && Object.keys(product.nutriments).length > 0 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nutritional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Energy */}
                {product.nutriments.energy !== undefined &&
                  product.nutriments.energy !== null &&
                  product.nutriments.energy !== 0 && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <p className="text-gray-700 font-semibold">Energy</p>
                      <p className="text-2xl font-bold text-orange-600 mt-1">
                        {product.nutriments.energy}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.nutriments.energy_unit || "kJ"}/100g
                      </p>
                    </div>
                  )}

                {/* Protein */}
                {product.nutriments.proteins !== undefined &&
                  product.nutriments.proteins !== null &&
                  product.nutriments.proteins !== 0 && (
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                      <p className="text-gray-700 font-semibold">Proteins</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        {product.nutriments.proteins}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Carbohydrates */}
                {product.nutriments.carbohydrates !== undefined &&
                  product.nutriments.carbohydrates !== null &&
                  product.nutriments.carbohydrates !== 0 && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                      <p className="text-gray-700 font-semibold">
                        Carbohydrates
                      </p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {product.nutriments.carbohydrates}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Fat */}
                {product.nutriments.fat !== undefined &&
                  product.nutriments.fat !== null &&
                  product.nutriments.fat !== 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <p className="text-gray-700 font-semibold">Total Fat</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {product.nutriments.fat}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Saturated Fat */}
                {product.nutriments["saturated-fat"] !== undefined &&
                  product.nutriments["saturated-fat"] !== null &&
                  product.nutriments["saturated-fat"] !== 0 && (
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                      <p className="text-gray-700 font-semibold">
                        Saturated Fat
                      </p>
                      <p className="text-2xl font-bold text-pink-600 mt-1">
                        {product.nutriments["saturated-fat"]}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Fiber */}
                {product.nutriments.fiber !== undefined &&
                  product.nutriments.fiber !== null &&
                  product.nutriments.fiber !== 0 && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <p className="text-gray-700 font-semibold">Fiber</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {product.nutriments.fiber}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Sugar */}
                {product.nutriments.sugars !== undefined &&
                  product.nutriments.sugars !== null &&
                  product.nutriments.sugars !== 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <p className="text-gray-700 font-semibold">Sugars</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {product.nutriments.sugars}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Salt */}
                {product.nutriments.salt !== undefined &&
                  product.nutriments.salt !== null &&
                  product.nutriments.salt !== 0 && (
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                      <p className="text-gray-700 font-semibold">Salt</p>
                      <p className="text-2xl font-bold text-cyan-600 mt-1">
                        {product.nutriments.salt}
                      </p>
                      <p className="text-sm text-gray-600">g/100g</p>
                    </div>
                  )}

                {/* Sodium */}
                {product.nutriments.sodium !== undefined &&
                  product.nutriments.sodium !== null &&
                  product.nutriments.sodium !== 0 && (
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                      <p className="text-gray-700 font-semibold">Sodium</p>
                      <p className="text-2xl font-bold text-teal-600 mt-1">
                        {product.nutriments.sodium}
                      </p>
                      <p className="text-sm text-gray-600">mg/100g</p>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ingredients
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">
                        <strong>{ingredient.text || ingredient}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Ingredients Text */}
          {product.ingredients_text && !product.ingredients && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ingredients
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {product.ingredients_text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullDetailOfProduct;
