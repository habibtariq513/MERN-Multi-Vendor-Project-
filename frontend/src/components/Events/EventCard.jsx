import React from "react";
import styles from "../../styles/styles.js";
import { backend_url } from "../../server.js";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active, data }) => {
  if (!data) return null;

  const image = data.images?.[0]
    ? `${backend_url}${data.images[0]}`
    : data.image_Url?.[0]?.url || "";

  return (
    <div
      className={`block w-full rounded-lg bg-white p-2 lg:flex ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="m-auto w-full lg:w-1/2">
        <img
          src={image}
          alt={data.name}
          className="mx-auto max-h-[360px] w-full object-contain"
        />
      </div>
      <div className="flex w-full flex-col justify-center lg:w-1/2 lg:px-6">
        <h2 className={styles.productTitle}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex justify-between py-2">
          <div className="flex">
            <h5 className="pr-3 text-[18px] font-[500] text-[#d55b45] line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-Roboto text-[20px] font-bold text-[#333]">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 text-[17px] font-[400] text-[#44a55e]">
            {data.sold_out ?? 0} sold
          </span>
        </div>
        <CountDown data={data} />
      </div>
    </div>
  );
};

export default EventCard;
