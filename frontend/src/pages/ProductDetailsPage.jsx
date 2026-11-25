import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { productData } from "../static/data.js";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products);
  const data =
    allProducts?.find(
      (product) => String(product._id) === String(id)
    ) ||
    productData.find(
      (product) => String(product._id || product.id || product.name) === String(id)
    );

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
