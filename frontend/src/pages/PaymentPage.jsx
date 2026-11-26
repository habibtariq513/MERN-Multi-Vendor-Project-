import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import styles from "../styles/styles.js";
import { server } from "../server.js";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = window.localStorage.getItem("latestOrder");
      setOrderData(savedOrder ? JSON.parse(savedOrder) : null);
    } catch {
      setOrderData(null);
    }
  }, []);

  const paymentSubmit = async () => {
    if (!orderData || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${server}/order/create-order`,
        orderData,
        { withCredentials: true }
      );
      dispatch({ type: "clearCart" });
      window.localStorage.removeItem("latestOrder");
      toast.success(
        `Order placed successfully${data.orders.length > 1 ? " with multiple shops" : ""}!`
      );
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className={`${styles.section} min-h-[50vh] py-10`}>
        <h1 className="text-[25px] font-[600]">Payment</h1>
        {orderData ? (
          <div className="mt-6 max-w-[600px] rounded bg-white p-5 shadow">
            <p>Items: {orderData.cart?.length || 0}</p>
            <p>Subtotal: ${Number(orderData.subTotalPrice || 0).toFixed(2)}</p>
            <p>Shipping: ${Number(orderData.shipping || 0).toFixed(2)}</p>
            <p>
              Discount: -${Number(orderData.discountPrice || 0).toFixed(2)}
            </p>
            <p className="mt-2 text-lg font-semibold">
              Total: ${Number(orderData.totalPrice || 0).toFixed(2)}
            </p>
            <button
              type="button"
              onClick={paymentSubmit}
              disabled={isSubmitting}
              className="mt-5 h-11 w-full rounded bg-[#e44343] font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? "Placing order..." : "Place order (Cash on delivery)"}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p>No pending order was found.</p>
            <Link to="/checkout" className="text-blue-600 underline">
              Return to checkout
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
