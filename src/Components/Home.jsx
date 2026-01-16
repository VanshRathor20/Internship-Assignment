import React from 'react'
import Products from './Products'
import SearchBar from './SearchBar'
import BarcodeSearch from "./BarcodeSearch";
import Category from './Category';
import SortItems from './SortItems';

const Home = () => {
  return (
    <>
      <SearchBar /><br />
      <BarcodeSearch /><br />
      {/* <Category/><br /> */}
      <SortItems/><br />
      <Products />
    </>
  );
}

export default Home