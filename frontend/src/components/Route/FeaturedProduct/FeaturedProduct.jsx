import React from "react";
import styles from "../../../styles/styles.js";
import { productData } from "../../../static/data.js";
import ProductCard from "../ProductCard/ProductCard.jsx";

const FeaturedProduct = () => {
  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <h1>Featured Products</h1>
        </div>
        <div className="mb-12 grid grid-cols-1 gap-[20px] border-0 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
          {productData.map((product) => (
            <ProductCard data={product} key={product.id || product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
