import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles.js";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const productName = data.name.replace(/\s+/g, "-");
  const productUrl = `/product/${encodeURIComponent(productName)}`;
  const rating = Math.max(0, Math.min(5, Math.round(data.ratings || 0)));

  return (
    <>
      <article className="relative h-[370px] w-full cursor-pointer rounded-lg bg-white p-3 shadow-sm">
        <Link
          to={productUrl}
          aria-label={`View ${data.name}`}
          className="block"
        >
          <img
            src={data.image_Url[0]?.url}
            alt={data.name}
            className="h-[170px] w-full object-contain"
          />
        </Link>
        <Link to="/shop" className="block">
          <h5 className={styles.shop_name}>{data.shop.name}</h5>
        </Link>
        <Link to={productUrl} className="block text-gray-900">
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? `${data.name.slice(0, 40)}...` : data.name}
          </h4>

          <div className="flex" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <AiFillStar
                  key={index}
                  className="mr-2"
                  color="#F6BA00"
                  size={20}
                />
              ) : (
                <AiOutlineStar
                  key={index}
                  className="mr-2"
                  color="#F6BA00"
                  size={20}
                />
              )
            )}
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex">
              <h5 className={styles.productDiscountPrice}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className={styles.price}>
                {data.price ? `${data.price} $` : null}
              </h4>
            </div>
            <span className="text-[17px] font-[400] text-[#68d284]">
              {data.total_sell} sold
            </span>
          </div>
        </Link>

        <div className="absolute right-2 top-5 flex flex-col gap-3">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setClick((isSelected) => !isSelected)}
            aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
            title={click ? "Remove from wishlist" : "Add to wishlist"}
          >
            {click ? (
              <AiFillHeart size={22} color="red" />
            ) : (
              <AiOutlineHeart size={22} color="#333" />
            )}
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Quick view"
            title="Quick view"
          >
            <AiOutlineEye size={22} color="#333" />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <AiOutlineShoppingCart size={25} color="#444" />
          </button>
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </article>
    </>
  );
};

export default ProductCard;
