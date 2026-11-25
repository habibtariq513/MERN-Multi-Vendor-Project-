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
import { backend_url } from "../../../server.js";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart.js";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist.js";

const ProductCard = ({ data, isShop = false, isEvent = false }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  if (!data) return null;

  const itemId = data._id || data.id || data.name;
  const productUrl = `/product/${encodeURIComponent(itemId)}`;
  const rating = Math.max(0, Math.min(5, Math.round(data.ratings || 0)));
  const uploadedImage = data.images?.[0];
  const imageUrl =
    (isShop || isEvent) && uploadedImage
      ? `${backend_url}${uploadedImage}`
      : uploadedImage
        ? `${backend_url}${uploadedImage}`
        : data.image_Url?.[0]?.url || "";
  const originalPrice = data.originalPrice ?? data.price;
  const discountPrice =
    data.discountPrice ?? data.discount_price ?? originalPrice;
  const shopUrl = data.shop?._id
    ? `/shop/preview/${data.shop._id}`
    : "/shop";
  const click =
    (wishlist || []).some((item) => (item._id || item.id || item.name) === itemId);

  const toggleWishlist = () => {
    const item = { ...data, _id: itemId };
    if (click) {
      dispatch(removeFromWishlist(item));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  const addItemToCart = () => {
    if (typeof data.stock === "number" && data.stock < 1) {
      toast.error("Product stock limited!");
      return;
    }
    dispatch(addToCart({ ...data, _id: itemId, qty: 1 }));
  };

  return (
    <>
      <article className="relative h-[370px] w-full cursor-pointer rounded-lg bg-white p-3 shadow-sm">
        <Link
          to={productUrl}
          aria-label={`View ${data.name}`}
          className="block"
        >
          <img
            src={imageUrl}
            alt={data.name}
            className="h-[170px] w-full object-contain"
          />
        </Link>
        <Link to={shopUrl} className="block">
          <h5 className={styles.shop_name}>{data.shop?.name || "Shop"}</h5>
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
                {discountPrice}$
              </h5>
              <h4 className={styles.price}>
                {originalPrice ? `${originalPrice} $` : null}
              </h4>
            </div>
            <span className="text-[17px] font-[400] text-[#68d284]">
              {data.sold_out ?? data.total_sell ?? 0} sold
            </span>
          </div>
        </Link>

        <div className="absolute right-2 top-5 flex flex-col gap-3">
          <button
            type="button"
            className="cursor-pointer"
            onClick={toggleWishlist}
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
            onClick={addItemToCart}
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
