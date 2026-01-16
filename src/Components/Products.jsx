import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      setLoading(true);
      const url =
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=apple&json=true";

      const response = await axios.get(url);

      setUserData(response.data.products); 
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        userData.map((item) => (
          <ul key={item.id}>
            <li>{item.product_name || item.product_name_en || "No name"}</li>
            <li>{item.brands || "No brand"}</li>
            <li>{item.categories || "No category"}</li>

            {item.image_front_url && (
              <img src={item.image_front_url} alt="product" width="120" />
            )}

            <br />
          </ul>
        ))
      )}
    </>
  );
};

export default Products;
