import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader.jsx";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loader />;
  }

  if (!isSeller) {
    return <Navigate replace to="/shop-login" />;
  }

  return children;
};

export default SellerProtectedRoute;
