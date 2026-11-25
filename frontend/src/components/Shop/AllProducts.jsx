import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../redux/actions/product.js";
import Loader from "../Layout/Loader.jsx";

const AllProducts = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.products
  );
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    const deleted = await dispatch(deleteProduct(id));
    if (deleted) {
      window.location.reload();
    }
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${encodeURIComponent(params.row.id)}`}>
            <Button aria-label={`Preview ${params.row.name}`}>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          aria-label={`Delete ${params.row.name}`}
          onClick={() => handleDelete(params.id)}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = [];

  products?.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      Stock: item.stock,
      sold: item.sold_out,
    });
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
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
    </div>
  );
};

export default AllProducts;
