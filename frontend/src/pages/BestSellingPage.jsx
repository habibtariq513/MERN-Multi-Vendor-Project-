import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header.jsx";
import ProductCard from "../components/Route/ProductCard/ProductCard.jsx";
import { productData } from "../static/data.js";
import styles from "../styles/styles.js";
import Footer from "../components/Layout/Footer.jsx";

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedProducts = [...productData].sort(
      (a, b) => b.total_sell - a.total_sell
    );
    setData(sortedProducts);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={styles.section}>
        <div className="mb-12 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
          {data.map((product) => (
            <ProductCard
              data={product}
              key={product.id || product.name}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
