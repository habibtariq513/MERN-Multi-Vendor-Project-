import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import styles from "../styles/styles.js";
import { server } from "../server.js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const shipping = cart?.length ? 10 : 0;
  const subTotalPrice = (cart || []).reduce(
    (sum, item) =>
      sum +
      Number(item.qty || 1) *
        Number(item.discountPrice ?? item.discount_price ?? item.price ?? 0),
    0
  );
  const eligibleSubtotal = coupon
    ? (cart || [])
        .filter((item) => String(item.shopId) === String(coupon.shopId))
        .reduce(
          (sum, item) =>
            sum +
            Number(item.qty || 1) *
              Number(
                item.discountPrice ?? item.discount_price ?? item.price ?? 0
              ),
          0
        )
    : 0;
  const totalPrice = Math.max(0, subTotalPrice + shipping - discountPrice);
  const discountPrice = coupon
    ? Math.min(
        (eligibleSubtotal * Number(coupon.value)) / 100,
        coupon.maxAmount == null ? Infinity : Number(coupon.maxAmount)
      )
    : 0;

  useEffect(() => {
    if (!user?.addresses?.length) return;
    const address = user.addresses[0];
    setCountry(address.country || "");
    setCity(address.city || "");
    setAddress1(address.address1 || "");
    setAddress2(address.address2 || "");
    setZipCode(address.zipCode || "");
  }, [user?.addresses]);

  const handleSavedAddress = (event) => {
    const address = user?.addresses?.find(
      (item) => item._id === event.target.value
    );
    if (!address) return;
    setCountry(address.country || "");
    setCity(address.city || "");
    setAddress1(address.address1 || "");
    setAddress2(address.address2 || "");
    setZipCode(address.zipCode || "");
  };

  const clearCoupon = () => {
    setCoupon(null);
    setCouponInput("");
  };

  const applyCoupon = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `${server}/coupon/get-coupon-value/${encodeURIComponent(
          couponInput.trim()
        )}`
      );
      const couponCode = data.couponCode;
      if (!couponCode) {
        clearCoupon();
        toast.error("Coupon code doesn't exists!");
        return;
      }

      const couponShopId =
        couponCode.shopId || couponCode.shop?._id || couponCode.shop?.id;
      const eligibleItems = (cart || []).filter(
        (item) => String(item.shopId) === String(couponShopId)
      );
      if (eligibleItems.length === 0) {
        clearCoupon();
        toast.error("Coupon code is not valid for this shop");
        return;
      }

      const eligiblePrice = eligibleItems.reduce(
        (sum, item) =>
          sum +
          Number(item.qty || 1) *
            Number(item.discountPrice ?? item.discount_price ?? item.price ?? 0),
        0
      );
      if (
        couponCode.minAmount != null &&
        eligiblePrice < Number(couponCode.minAmount)
      ) {
        clearCoupon();
        toast.error(`Minimum eligible amount is ${couponCode.minAmount}`);
        return;
      }

      setCoupon({ ...couponCode, shopId: String(couponShopId) });
      toast.success("Coupon applied successfully!");
    } catch (error) {
      clearCoupon();
      toast.error(
        error.response?.data?.message || "Unable to validate coupon"
      );
    }
  };

  const paymentSubmit = (event) => {
    event.preventDefault();
    if (!cart?.length) {
      toast.error("Your cart is empty");
      return;
    }
    if (!country || !city || !address1 || !zipCode) {
      toast.error("Please complete your shipping address");
      return;
    }

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      couponCode: coupon?.name,
      shippingAddress: {
        country,
        city,
        address1,
        address2,
        zipCode,
      },
      user,
    };
    window.localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div>
      <Header activeHeading={0} />
      <div className={`${styles.section} min-h-[50vh] py-10`}>
        <h1 className="text-[25px] font-[600]">Checkout</h1>
        <form
          onSubmit={paymentSubmit}
          className="mt-6 grid max-w-[700px] gap-4 rounded bg-white p-5 shadow"
        >
          {user?.addresses?.length > 0 && (
            <div>
              <label className="block pb-2">Saved Address</label>
              <select
                className={styles.input}
                defaultValue=""
                onChange={handleSavedAddress}
              >
                <option value="" disabled>Select an address</option>
                {user.addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.addressType}: {address.address1}, {address.city}
                  </option>
                ))}
              </select>
            </div>
          )}
          {[
            ["Country", country, setCountry],
            ["City", city, setCity],
            ["Address 1", address1, setAddress1],
            ["Address 2", address2, setAddress2],
            ["Zip Code", zipCode, setZipCode],
          ].map(([label, value, setter]) => (
            <div key={label}>
              <label className="block pb-2">{label}</label>
              <input
                type={label === "Zip Code" ? "number" : "text"}
                className={styles.input}
                value={value}
                onChange={(event) => setter(event.target.value)}
              />
            </div>
          ))}
          <div className="border-t pt-4">
            <label className="block pb-2">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                className={styles.input}
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                disabled={Boolean(coupon)}
              />
              {coupon ? (
                <button
                  type="button"
                  className="rounded bg-gray-600 px-4 text-white"
                  onClick={clearCoupon}
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded bg-[#3321c8] px-4 text-white"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
          <div className="border-t pt-4">
            <p>Subtotal: ${subTotalPrice.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p>Discount: -${discountPrice.toFixed(2)}</p>
            <p className="mt-2 text-lg font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            type="submit"
            className="h-11 rounded bg-[#e44343] font-semibold text-white"
          >
            Continue to payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
