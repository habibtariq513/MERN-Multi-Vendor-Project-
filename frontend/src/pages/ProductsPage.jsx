import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";
import ProductCard from "../components/Route/ProductCard/ProductCard.jsx";
import styles from "../styles/styles.js";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const products = allProducts || [];
    if (categoryData === null) {
      setData(
        [...products].sort(
          (a, b) =>
            Number(b.sold_out ?? b.total_sell ?? 0) -
            Number(a.sold_out ?? a.total_sell ?? 0)
        )
      );
    } else {
      setData(
        products.filter((product) => product.category === categoryData)
      );
    }
  }, [allProducts, categoryData]);

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
        {!isLoading && data.length === 0 && (
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
