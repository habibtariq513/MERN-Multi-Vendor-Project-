import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url, server } from "../../server.js";
import {
  deleteUserAddress,
  updateAvatar,
  updateUserInfo,
  updatUserAddress,
} from "../../redux/actions/user.js";

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhoneNumber(user?.phoneNumber || "");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        updateUserInfo({ name, email, phoneNumber, password })
      );
      toast.success("Profile updated successfully!");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await dispatch(updateAvatar(formData));
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update avatar");
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update password"
      );
    }
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={
                  typeof user?.avatar === "string"
                    ? user.avatar
                    : user?.avatar?.url
                      ? `${backend_url}${user.avatar.url}`
                      : "/vite.svg"
                }
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <label className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              <input
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmit={handlePasswordSubmit}
          />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const orders = [
  {
    _id: "74637843764637846",
    orderItems: [{ name: "Iphone 14 pro max" }],
    totalPrice: 120,
    orderStatus: "Processing",
  },
];

const getRows = () =>
  orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    total: `US$ ${item.totalPrice}`,
    status: item.orderStatus,
  }));

const AllOrders = () => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", minWidth: 130, flex: 0.8 },
    {
      field: "details",
      headerName: "",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="pl-8 pt-1 h-[400px]">
      <DataGrid rows={getRows()} columns={columns} disableRowSelectionOnClick />
    </div>
  );
};

const AllRefundOrders = () => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", minWidth: 130, flex: 0.8 },
    {
      field: "details",
      headerName: "",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="pl-8 pt-1 h-[400px]">
      <DataGrid rows={getRows()} columns={columns} disableRowSelectionOnClick />
    </div>
  );
};

const TrackOrder = () => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", minWidth: 130, flex: 0.8 },
    {
      field: "track",
      headerName: "",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/track/order/${params.id}`}>
          <Button>
            <MdTrackChanges size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="pl-8 pt-1 h-[400px]">
      <DataGrid rows={getRows()} columns={columns} disableRowSelectionOnClick />
    </div>
  );
};

const ChangePassword = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
}) => (
  <div className="w-full px-5">
    <h1 className="pb-5 text-[25px] font-[600] text-[#000000ba]">
      Change Password
    </h1>
    <form onSubmit={handleSubmit} className="max-w-[500px]">
      {[
        ["Old Password", oldPassword, setOldPassword],
        ["New Password", newPassword, setNewPassword],
        ["Confirm Password", confirmPassword, setConfirmPassword],
      ].map(([label, value, setter]) => (
        <div className="pb-3" key={label}>
          <label className="block pb-2">{label}</label>
          <input
            type="password"
            className={styles.input}
            required
            value={value}
            onChange={(event) => setter(event.target.value)}
          />
        </div>
      ))}
      <input
        type="submit"
        value="Update"
        className="mt-4 h-[40px] w-[250px] cursor-pointer rounded-[3px] border border-[#3a24db] text-center text-[#3a24db]"
      />
    </form>
  </div>
);

const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("");

  const handleAddAddress = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        updatUserAddress({
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        })
      );
      toast.success("Address added successfully!");
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add address");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteUserAddress(id));
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete address");
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">Address</h1>
        <button
          type="button"
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </button>
      </div>
      <br />
      {user?.addresses?.map((address) => (
        <div
          key={address._id}
          className="mb-3 flex min-h-[70px] w-full items-center rounded-[4px] bg-white px-3 pr-10 shadow"
        >
          <h5 className="min-w-[120px] pl-5 font-[600]">
            {address.addressType}
          </h5>
          <h6 className="pl-8">
            {address.address1}
            {address.address2 ? `, ${address.address2}` : ""}, {address.city},{" "}
            {address.country} {address.zipCode}
          </h6>
          <AiOutlineDelete
            className="ml-auto cursor-pointer"
            size={25}
            onClick={() => handleDeleteAddress(address._id)}
          />
        </div>
      ))}

      {open && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/30">
          <div className="w-[90%] max-w-[500px] rounded bg-white p-5">
            <h2 className="mb-4 text-xl font-[600]">Add Address</h2>
            <form onSubmit={handleAddAddress}>
              {[
                ["Country", country, setCountry],
                ["City", city, setCity],
                ["Address 1", address1, setAddress1],
                ["Address 2", address2, setAddress2],
                ["Zip Code", zipCode, setZipCode],
                ["Address Type", addressType, setAddressType],
              ].map(([label, value, setter]) => (
                <div className="pb-3" key={label}>
                  <label className="block pb-2">{label}</label>
                  <input
                    type={label === "Zip Code" ? "number" : "text"}
                    className={styles.input}
                    required={label !== "Address 2"}
                    value={value}
                    onChange={(event) => setter(event.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-3">
                <input
                  type="submit"
                  value="Submit"
                  className={`${styles.button} !h-[40px] !rounded cursor-pointer`}
                />
                <button
                  type="button"
                  className={`${styles.button} !h-[40px] !rounded bg-gray-600`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
