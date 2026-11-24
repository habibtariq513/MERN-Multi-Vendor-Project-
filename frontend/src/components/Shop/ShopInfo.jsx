import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles.js";
import { backend_url, server } from "../../server.js";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const { products, allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setData(null);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then(({ data: response }) => setData(response.shop))
      .catch((error) => {
        toast.error(error.response?.data?.message || "Unable to load shop");
      });
  }, [id]);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/shop/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      navigate("/shop-login");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log out");
    }
  };

  const avatar = data?.avatar?.url || data?.avatar;
  const avatarUrl = avatar
    ? avatar.startsWith("http")
      ? avatar
      : `${backend_url}${avatar}`
    : "";
  const shopProducts =
    products?.filter((product) => String(product.shopId) === String(id)) || [];
  const allShopProducts =
    allProducts?.filter((product) => String(product.shopId) === String(id)) ||
    [];

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={avatarUrl}
            alt={data?.name ? `${data.name} avatar` : "Shop avatar"}
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data?.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">
          {shopProducts.length || allShopProducts.length}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined on</h5>
        <h4 className="text-[#000000b0]">
          {data?.createdAt?.slice(0, 10)}
        </h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopInfo;
