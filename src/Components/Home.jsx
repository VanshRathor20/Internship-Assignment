import React, { useState } from "react";
import Products from "./Products";
import SearchBar from "./SearchBar";
import BarcodeSearch from "./BarcodeSearch";
import Category from "./Category";
import SortItems from "./SortItems";
import Products2 from "./Products2";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <SearchBar />
      <br />
      <Category
        allProducts={allProducts}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <br />
      {/* <Products /> original Product files to fetch data from an API */}
      <Products2
        onProductsLoaded={setAllProducts}
        selectedCategory={selectedCategory}
      />{" "}
    </>
  );
};

export default Home;
