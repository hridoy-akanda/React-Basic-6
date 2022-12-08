import React from "react";
import { CartState } from "../context/Context";
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, bySearch },
  } = CartState();

  const transformedProducts = () => {
    let filteredProducts = products;
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    }
    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      filteredProducts = filteredProducts.filter((prod) => prod.fastDelivery);
    }
    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }
    if (bySearch) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(bySearch.toLowerCase())
      );
    }
    return filteredProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformedProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
