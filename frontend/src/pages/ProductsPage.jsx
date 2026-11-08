import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";
import ProductCard from "../components/Route/ProductCard/ProductCard.jsx";
import { productData } from "../static/data.js";
import styles from "../styles/styles.js";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      setData(
        [...productData].sort((a, b) => a.total_sell - b.total_sell)
      );
    } else {
      setData(productData.filter((product) => product.category === categoryData));
    }
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
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
        {data.length === 0 && (
          <h1 className="w-full pb-[100px] text-center text-[20px]">
            No products Found!
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
