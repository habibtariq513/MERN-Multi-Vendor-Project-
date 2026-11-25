import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../../redux/actions/cart.js";
import { backend_url } from "../../server.js";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const totalPrice = (cart || []).reduce(
    (acc, item) =>
      acc +
      Number(item.qty || 1) *
        Number(
          item.discountPrice ??
            item.discount_price ??
            item.price ??
            0
        ),
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[90%] max-w-[420px] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
              size={25}
            />
          </div>
          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cart?.length || 0} items
            </h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CartSingle data={i} key={index} />
              ))}
          </div>
        </div>

        <div className="px-5 mb-3">
          {/* checkout buttons */}
          <Link to="/checkout">
            <div
              className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]"
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (USD${totalPrice})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();
  const value = data.qty || 1;
  const price =
    data.discountPrice ??
    data.discount_price ??
    data.price ??
    0;
  const totalPrice = price * value;
  const image = data.images?.[0]
    ? `${backend_url}${data.images[0]}`
    : data.image_Url?.[0]?.url || "";

  const increment = () => {
    if (typeof data.stock === "number" && value >= data.stock) {
      toast.error("Product stock limited!");
      return;
    }
    dispatch(addToCart({ ...data, qty: value + 1 }));
  };

  const decrement = () => {
    if (value <= 1) {
      dispatch(removeFromCart(data));
      return;
    }
    dispatch(addToCart({ ...data, qty: value - 1 }));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={increment}
          >
            <HiPlus color="#fff" size={18} />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={decrement}
          >
            <HiOutlineMinus color="#7d879c" size={16} />
          </div>
        </div>
        <img
          src={image}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => dispatch(removeFromCart(data))}
        />
      </div>
    </div>
  );
};

export default Cart;
