import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles.js";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.title)}`);
    setDropDown(false);
  };

  return (
    <div className="absolute left-0 top-full z-30 max-h-[70vh] w-[270px] overflow-y-auto rounded-b-md bg-white pb-4 shadow-lg">
      {categoriesData?.map((category) => (
        <button
          key={category.title}
          type="button"
          className={`${styles.noramlFlex} w-full text-left hover:bg-gray-100`}
          onClick={() => submitHandle(category)}
        >
          <img
            src={category.image_Url}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
            alt=""
          />
          <span className="m-3 cursor-pointer select-none">{category.title}</span>
        </button>
      ))}
    </div>
  );
};

export default DropDown;
