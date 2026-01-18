import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import FullDetailOfProduct from "./Components/FullDetailOfProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:barcode" element={<FullDetailOfProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
