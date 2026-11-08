import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data.js";
import styles from "../../../styles/styles.js";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex w-full justify-between rounded-md bg-white p-5 shadow-sm">
          {brandingData.map((item) => (
            <div className="flex items-start" key={item.id}>
              {item.icon}
              <div className="px-3">
                <h3 className="text-sm font-bold md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.section} mb-12 rounded-lg bg-white p-6`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData.map((category) => (
            <button
              type="button"
              className="flex h-[100px] w-full cursor-pointer items-center justify-between overflow-hidden text-left"
              key={category.id}
              onClick={() =>
                navigate(
                  `/products?category=${encodeURIComponent(category.title)}`
                )
              }
            >
              <span className="text-[18px] leading-[1.3]">
                {category.title}
              </span>
              <img
                src={category.image_Url}
                className="w-[120px] object-cover"
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
