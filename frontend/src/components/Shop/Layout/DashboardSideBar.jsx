import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

const DashboardSideBar = ({ active }) => {
  const items = [
    { title: "Dashboard", to: "/dashboard", icon: RxDashboard },
    { title: "All Orders", to: "/dashboard-orders", icon: FiShoppingBag },
    { title: "All Products", to: "/dashboard-products", icon: FiPackage },
    {
      title: "Create Product",
      to: "/dashboard-create-product",
      icon: AiOutlineFolderAdd,
    },
    { title: "All Events", to: "/dashboard-events", icon: MdOutlineLocalOffer },
    { title: "Create Event", to: "/dashboard-create-event", icon: VscNewFile },
    {
      title: "Withdraw Money",
      to: "/dashboard-withdraw-money",
      icon: CiMoneyBill,
    },
    {
      title: "Shop Inbox",
      to: "/dashboard-messages",
      icon: BiMessageSquareDetail,
    },
    {
      title: "Discount Codes",
      to: "/dashboard-coupons",
      icon: AiOutlineGift,
    },
    {
      title: "Refunds",
      to: "/dashboard-refunds",
      icon: HiOutlineReceiptRefund,
    },
    { title: "Settings", to: "/settings", icon: IoSettingsOutline },
  ];

  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {items.map(({ title, to, icon: Icon }, index) => {
        const itemNumber = index + 1;
        const isActive = active === itemNumber;

        return (
          <div className="w-full flex items-center p-4" key={to}>
            <Link className="w-full flex items-center" to={to}>
              <Icon
                color={isActive ? "crimson" : "#555"}
                size={30}
                aria-hidden="true"
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  isActive ? "text-[crimson]" : "text-[#555]"
                }`}
              >
                {title}
              </h5>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSideBar;
