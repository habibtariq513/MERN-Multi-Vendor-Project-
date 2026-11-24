import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { productData } from "../static/data.js";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const { allProducts } = useSelector((state) => state.products);
  const productName = name?.replace(/-/g, " ");
  const data =
    allProducts?.find(
      (product) =>
        product.name === productName ||
        product.name.replace(/\s+/g, "-") === name
    ) ||
    productData.find((product) => product.name === productName);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
