import React from 'react'
import Products from './Products'
import SearchBar from './SearchBar'
import BarcodeSearch from "./BarcodeSearch";
import Category from './Category';
import SortItems from './SortItems';
import Products2 from './Products2';

const Home = () => {
  return (
    <>
      <SearchBar /><br />
      <BarcodeSearch /><br />
      {/* <Category/><br /> */}
      <SortItems/><br />
      {/* <Products /> original Product files to fetch data from an API */}
      <Products2 />  {/* Infinite scroll implementation */}
    </>
  );
}

export default Home