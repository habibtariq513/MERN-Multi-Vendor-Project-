import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/store.js";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        dispatch(logout());
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Unable to log out");
      });
  };

  const items = [
    {
      id: 1,
      label: "Profile",
      icon: <RxPerson size={20} />,
      action: () => setActive(1),
    },
    {
      id: 2,
      label: "Orders",
      icon: <HiOutlineShoppingBag size={20} />,
      action: () => setActive(2),
    },
    {
      id: 3,
      label: "Refunds",
      icon: <HiOutlineReceiptRefund size={20} />,
      action: () => setActive(3),
    },
    {
      id: 4,
      label: "Inbox",
      icon: <AiOutlineMessage size={20} />,
      action: () => {
        setActive(4);
        navigate("/inbox");
      },
    },
    {
      id: 5,
      label: "Track Order",
      icon: <MdOutlineTrackChanges size={20} />,
      action: () => setActive(5),
    },
    {
      id: 6,
      label: "Payment methods",
      icon: <RiLockPasswordLine size={20} />,
      action: () => setActive(6),
    },
    {
      id: 7,
      label: "Address",
      icon: <TbAddressBook size={20} />,
      action: () => setActive(7),
    },
    {
      id: 8,
      label: "Log out",
      icon: <AiOutlineLogin size={20} />,
      action: logoutHandler,
    },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={item.action}
        >
          {React.cloneElement(item.icon, {
            color: active === item.id ? "red" : undefined,
          })}
          <span
            className={`pl-3 ${
              active === item.id ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
