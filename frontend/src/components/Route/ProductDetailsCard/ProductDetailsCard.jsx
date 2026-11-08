import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles.js";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  if (!data) return null;

  const shop = data.shop || {};
  const image = data.image_Url?.[0]?.url;
  const shopAvatar = shop.shop_avatar?.url;

  return (
    <div className="bg-[#fff]">
      <div
        className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-[#00000030]"
        onClick={() => setOpen(false)}
      >
        <div
          className="relative h-[90vh] w-[90%] overflow-y-scroll rounded-md bg-white p-4 shadow-sm 800px:h-[75vh] 800px:w-[60%]"
          role="dialog"
          aria-modal="true"
          aria-label={`${data.name} quick view`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-50 rounded p-1 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
            aria-label="Close product details"
          >
            <RxCross1 size={30} />
          </button>

          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <img src={image} alt={data.name} className="max-h-80 w-full object-contain" />
              <div className="flex items-center">
                {shopAvatar ? (
                  <img
                    src={shopAvatar}
                    alt={`${shop.name || "Shop"} avatar`}
                    className="mr-2 h-[50px] w-[50px] rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="mr-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-600"
                    aria-hidden="true"
                  >
                    {shop.name?.charAt(0) || "S"}
                  </span>
                )}
                <div>
                  <h3 className={styles.shop_name}>{shop.name || "Shop"}</h3>
                  <h5 className="pb-3 text-[15px]">
                    ({shop.ratings ?? 0}) Ratings
                  </h5>
                </div>
              </div>
              <button
                type="button"
                className={`${styles.button} mt-4 h-11 rounded-[4px]`}
                onClick={handleMessageSubmit}
              >
                <span className="flex items-center text-[#fff]">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </button>
              <h5 className="mt-5 text-[16px] text-[red]">
                ({data.total_sell ?? 0}) Sold out
              </h5>
            </div>

            <div className="w-full pt-5 pl-[5px] pr-[5px] 800px:w-[50%]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={styles.productDiscountPrice}>
                  {data.discount_price ?? data.price}$
                </h4>
                <h3 className={styles.price}>
                  {data.price ? `${data.price}$` : null}
                </h3>
              </div>
              <div className="mt-12 flex items-center justify-between pr-3">
                <div>
                  <button
                    type="button"
                    className="rounded-l bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-2 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:opacity-75"
                    onClick={decrementCount}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="bg-gray-200 px-4 py-[11px] font-medium text-gray-800">
                    {count}
                  </span>
                  <button
                    type="button"
                    className="rounded-r bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-2 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:opacity-75"
                    onClick={incrementCount}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setClick((isSelected) => !isSelected)}
                  aria-label={
                    click ? "Remove from wishlist" : "Add to wishlist"
                  }
                  title={click ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {click ? (
                    <AiFillHeart size={30} color="red" />
                  ) : (
                    <AiOutlineHeart size={30} color="#333" />
                  )}
                </button>
              </div>
              <button
                type="button"
                className={`${styles.button} mt-6 flex h-11 items-center rounded-[4px]`}
                onClick={handleMessageSubmit}
              >
                <span className="flex items-center text-[#fff]">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
