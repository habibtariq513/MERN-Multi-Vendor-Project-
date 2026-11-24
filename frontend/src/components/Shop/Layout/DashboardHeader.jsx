import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server.js";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const avatar = seller?.avatar?.url || seller?.avatar;

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="ShopO dashboard"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link className="800px:block hidden" to="/dashboard-coupons">
            <AiOutlineGift
              className="mx-5 cursor-pointer"
              color="#555"
              size={30}
              title="Coupons"
            />
          </Link>
          <Link className="800px:block hidden" to="/dashboard-events">
            <MdOutlineLocalOffer
              className="mx-5 cursor-pointer"
              color="#555"
              size={30}
              title="Events"
            />
          </Link>
          <Link className="800px:block hidden" to="/dashboard-products">
            <FiShoppingBag
              className="mx-5 cursor-pointer"
              color="#555"
              size={30}
              title="Products"
            />
          </Link>
          <Link className="800px:block hidden" to="/dashboard-orders">
            <FiPackage
              className="mx-5 cursor-pointer"
              color="#555"
              size={30}
              title="Orders"
            />
          </Link>
          <Link className="800px:block hidden" to="/dashboard-messages">
            <BiMessageSquareDetail
              className="mx-5 cursor-pointer"
              color="#555"
              size={30}
              title="Messages"
            />
          </Link>
          <Link to={`/shop/${seller?._id || ""}`}>
            <img
              src={
                avatar
                  ? `${backend_url}${avatar}`
                  : "https://via.placeholder.com/50"
              }
              alt="Shop profile"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
