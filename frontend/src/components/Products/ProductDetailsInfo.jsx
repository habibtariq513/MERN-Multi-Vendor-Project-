import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import { backend_url } from "../../server.js";

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const { products, allProducts } = useSelector((state) => state.products);
  const shop = data.shop || {};
  const avatar =
    shop.avatar?.url ||
    shop.avatar ||
    shop.shop_avatar?.url ||
    data.images?.[0] ||
    data.image_Url?.[0]?.url ||
    "";
  const shopAvatar =
    avatar && !avatar.startsWith("http") ? `${backend_url}${avatar}` : avatar;
  const shopProducts =
    products?.filter(
      (product) => String(product.shopId) === String(shop._id)
    ) || [];
  const totalProducts =
    shopProducts.length ||
    allProducts?.filter(
      (product) => String(product.shopId) === String(shop._id)
    ).length ||
    0;

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex items-center justify-center">
          <p>No Reviews have for this product!</p>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={shopAvatar}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({shop.ratings || data.ratings || 0}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">{shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on{" "}
                <span className="font-[500]">
                  {shop.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products{" "}
                <span className="font-[500]">{totalProducts}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews <span className="font-[500]">324</span>
              </h5>
              <Link
                to={
                  shop._id ? `/shop/preview/${shop._id}` : "/shop"
                }
              >
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsInfo;
