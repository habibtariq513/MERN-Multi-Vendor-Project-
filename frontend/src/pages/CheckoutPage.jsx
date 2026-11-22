import React from "react";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import styles from "../styles/styles.js";

const CheckoutPage = () => {
  return (
    <div>
      <Header activeHeading={0} />
      <div className={`${styles.section} min-h-[50vh] py-10`}>
        <h1 className="text-[25px] font-[600]">Checkout</h1>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
