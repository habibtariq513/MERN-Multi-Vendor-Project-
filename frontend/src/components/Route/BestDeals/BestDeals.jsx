import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles.js";
import ProductCard from "../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const sortedProducts = [...(allProducts || [])].sort(
      (a, b) =>
        Number(b.sold_out ?? b.total_sell ?? 0) -
        Number(a.sold_out ?? a.total_sell ?? 0)
    );
    setData(sortedProducts.slice(0, 5));
  }, [allProducts]);

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
