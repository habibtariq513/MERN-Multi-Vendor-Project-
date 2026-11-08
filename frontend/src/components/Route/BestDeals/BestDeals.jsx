import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data.js";
import styles from "../../../styles/styles.js";
import ProductCard from "../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedProducts = [...productData].sort(
      (a, b) => b.total_sell - a.total_sell
    );
    setData(sortedProducts.slice(0, 5));
  }, []);

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <h1>Best Deals</h1>
        </div>
        <div className="mb-12 grid grid-cols-1 gap-[20px] border-0 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
          {data.map((product) => (
            <ProductCard data={product} key={product.id || product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
