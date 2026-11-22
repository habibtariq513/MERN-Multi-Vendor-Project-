import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
                    : user?.avatar?.url || "/vite.svg"
                }
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
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
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(event) => setAddress1(event.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={address2}
                    onChange={(event) => setAddress2(event.target.value)}
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
          <PaymentMethod />
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

const PaymentMethod = () => (
  <div className="w-full px-5">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
        Payment Methods
      </h1>
      <div className={`${styles.button} !rounded-md`}>
        <span className="text-[#fff]">Add New</span>
      </div>
    </div>
    <br />
    <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
      <div className="flex items-center">
        <img
          src="https://bonikahaat.com/storage/app/public/uploads/en/16462845916056.png"
          alt=""
        />
        <h5 className="pl-5 font-[600]">Shahriar Sajeeb</h5>
      </div>
      <div className="pl-8 flex items-center">
        <h6>**** **** **** 1234</h6>
        <h5 className="pl-6">08/2026</h5>
      </div>
      <div className="min-w-[10%] flex items-center justify-between pl-8">
        <AiOutlineDelete className="cursor-pointer" size={25} />
      </div>
    </div>
  </div>
);

const Address = () => (
  <div className="w-full px-5">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">Address</h1>
      <div className={`${styles.button} !rounded-md`}>
        <span className="text-[#fff]">Add New</span>
      </div>
    </div>
    <br />
    <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
      <div className="flex items-center">
        <h5 className="pl-5 font-[600]">Default</h5>
      </div>
      <div className="pl-8 flex items-center">
        <h6>494 Halladay St, Seattle, WA</h6>
      </div>
      <div className="pl-8 flex items-center">
        <h6>(213) 213-8409</h6>
      </div>
      <div className="min-w-[10%] flex items-center justify-between pl-8">
        <AiOutlineDelete className="cursor-pointer" size={25} />
      </div>
    </div>
  </div>
);

export default ProfileContent;
