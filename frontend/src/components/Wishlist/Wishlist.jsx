import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles.js";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeFromWishlist,
} from "../../redux/actions/wishlist.js";
import { addToCart } from "../../redux/actions/cart.js";
import { backend_url } from "../../server.js";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[90%] max-w-[420px] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
              size={25}
            />
          </div>
          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishlist?.length || 0} items
            </h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {wishlist &&
              wishlist.map((i, index) => (
                <WishlistSingle data={i} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistSingle = ({ data }) => {
  const dispatch = useDispatch();
  const price =
    data.discountPrice ??
    data.discount_price ??
    data.price ??
    0;
  const image = data.images?.[0]
    ? `${backend_url}${data.images[0]}`
    : data.image_Url?.[0]?.url || "";

  const addItemToCart = () => {
    if (typeof data.stock === "number" && data.stock < 1) {
      toast.error("Product stock limited!");
      return;
    }
    dispatch(addToCart({ ...data, qty: 1 }));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer"
          onClick={() => dispatch(removeFromWishlist(data))}
        />
        <img
          src={image}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${price}
          </h4>
        </div>
        <div>
          <button
            type="button"
            onClick={addItemToCart}
            aria-label={`Add ${data.name} to cart`}
          >
            <BsCartPlus className="cursor-pointer" size={20} title="Add to cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
