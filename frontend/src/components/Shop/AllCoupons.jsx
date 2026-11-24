import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllProductsShop } from "../../redux/actions/product.js";
import { server } from "../../server.js";
import styles from "../../styles/styles.js";
import Loader from "../Layout/Loader.jsx";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState("");

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!seller?._id) {
      return;
    }

    setIsLoading(true);
    dispatch(getAllProductsShop(seller._id));
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Unable to load coupon codes"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, seller?._id]);

  const handleDelete = async () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct: selectedProducts,
          value,
          shop: seller,
        },
        { withCredentials: true }
      );
      toast.success(
        data.message || "Coupon code created successfully!"
      );
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create coupon code"
      );
    }
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          aria-label={`Delete coupon ${params.row.name}`}
          onClick={() => handleDelete(params.id)}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = [];

  coupons.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: `${item.value} %`,
    });
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <div className="w-full flex justify-end">
        <div
          className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Create Coupon Code</span>
        </div>
      </div>
      <DataGrid
        autoHeight
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rows={row}
      />
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
          <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 relative overflow-y-auto">
            <div className="w-full flex justify-end">
              <button
                type="button"
                aria-label="Close coupon form"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 size={30} />
              </button>
            </div>
            <h5 className="text-[30px] font-Poppins text-center">
              Create Coupon code
            </h5>
            <form aria-required={true} onSubmit={handleSubmit}>
              <br />
              <div>
                <label className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your coupon code name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Discount Percentenge{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="value"
                  required
                  min="1"
                  max="100"
                  value={value}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your coupon code value..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Min Amount</label>
                <input
                  type="number"
                  name="minAmount"
                  min="0"
                  value={minAmount}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Enter your coupon code min amount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Max Amount</label>
                <input
                  type="number"
                  name="maxAmount"
                  min="0"
                  value={maxAmount}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Enter your coupon code max amount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Selected Product</label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={selectedProducts}
                  onChange={(e) => setSelectedProducts(e.target.value)}
                >
                  <option value="">
                    Choose a selected product
                  </option>
                  {products?.map((product) => (
                    <option value={product.name} key={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Create"
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
