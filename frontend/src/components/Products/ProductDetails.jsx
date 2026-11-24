import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import { backend_url } from "../../server.js";
import ProductDetailsInfo from "./ProductDetailsInfo.jsx";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { products, allProducts } = useSelector((state) => state.products);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507ebjver88423");
  };

  if (!data) return null;

  const images =
    data.images?.length > 0
      ? data.images.map((image) => `${backend_url}${image}`)
      : data.image_Url?.map((image) => image.url) || [];
  const selectedImage = images[select] || images[0] || "";
  const firstImage = images[0] || "";
  const shop = data.shop || {};
  const avatar =
    shop.avatar?.url || shop.avatar || shop.shop_avatar?.url || firstImage;
  const shopAvatar =
    avatar && !avatar.startsWith("http") ? `${backend_url}${avatar}` : avatar;
  const originalPrice = data.originalPrice ?? data.price;
  const discountPrice =
    data.discountPrice ?? data.discount_price ?? originalPrice;
  const matchingShopProducts =
    products?.filter(
      (product) => String(product.shopId) === String(shop._id)
    ) || [];
  const totalShopProducts =
    matchingShopProducts.length ||
    allProducts?.filter(
      (product) => String(product.shopId) === String(shop._id)
    ).length ||
    0;
  const shopSummary = (
    <>
      <img
        src={shopAvatar}
        alt={`${shop.name || "Shop"} avatar`}
        className="w-[50px] h-[50px] rounded-full mr-2"
      />
      <div className="pr-8">
        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
          {shop.name || "Shop"}
        </h3>
        <h5 className="pb-3 text-[15px]">
          ({shop.ratings || data.ratings || 0}) Ratings
        </h5>
        <span className="text-sm text-gray-600">
          {totalShopProducts} Products
        </span>
      </div>
    </>
  );

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <img
                src={selectedImage}
                alt=""
                className="w-[80%]"
              />
              <div className="w-full flex">
                {images.map((image, index) => (
                  <div
                    className={`${
                      select === index ? "border" : "null"
                    } cursor-pointer`}
                    key={image}
                  >
                    <img
                      src={image}
                      alt={`${data.name} ${index + 1}`}
                      className="h-[200px]"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full 800px:w-[50%] pt-5">
              <h1 className={`${styles.productTitle}`}>{data.name}</h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {discountPrice}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {originalPrice ? `${originalPrice}$` : null}
                </h3>
              </div>

              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      size={30}
                      color="red"
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      size={30}
                      color="#333"
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              <div
                className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
              >
                <span className="text-white flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>

              <div className="flex items-center pt-8">
                {shop._id ? (
                  <Link
                    to={`/shop/preview/${shop._id}`}
                    className="flex items-center"
                  >
                    {shopSummary}
                  </Link>
                ) : (
                  <div className="flex items-center">{shopSummary}</div>
                )}
                <div
                  className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailsInfo data={data} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProductDetails;
