import React from "react";
import styles from "../../styles/styles.js";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div
      className={`block w-full rounded-lg bg-white p-2 lg:flex ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="m-auto w-full lg:w-1/2">
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt="iPhone 14 Pro Max"
          className="mx-auto max-h-[360px] w-full object-contain"
        />
      </div>
      <div className="flex w-full flex-col justify-center lg:w-1/2 lg:px-6">
        <h2 className={styles.productTitle}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque exercitationem labore vel, dolore quidem
          asperiores, laudantium temporibus soluta optio consequatur aliquam
          deserunt officia. Dolorum saepe nulla provident. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque
          exercitationem labore vel, dolore quidem asperiores, laudantium
          temporibus soluta optio consequatur aliquam deserunt officia. Dolorum
          saepe nulla provident.
        </p>
        <div className="flex justify-between py-2">
          <div className="flex">
            <h5 className="pr-3 text-[18px] font-[500] text-[#d55b45] line-through">
              1099$
            </h5>
            <h5 className="font-Roboto text-[20px] font-bold text-[#333]">
              999$
            </h5>
          </div>
          <span className="pr-3 text-[17px] font-[400] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
