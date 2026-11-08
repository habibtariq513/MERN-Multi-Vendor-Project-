import React from "react";
import styles from "../../styles/styles.js";

const Sponsored = () => {
  const brands = [
    {
      name: "Sony",
      src: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
    },
    {
      name: "Dell",
      src: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
    },
    {
      name: "LG",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png",
    },
    {
      name: "Apple",
      src: "https://www.vectorlogo.zone/logos/apple/apple-ar21.png",
    },
    {
      name: "Microsoft",
      src: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.png",
    },
  ];

  return (
    <div
      className={`${styles.section} mb-12 hidden cursor-pointer rounded-xl bg-white px-5 py-10 sm:block`}
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        {brands.map((brand) => (
          <div className="flex items-start" key={brand.name}>
            <img
              src={brand.src}
              alt={`${brand.name} logo`}
              style={{ width: "150px", objectFit: "contain" }}
              className="max-h-12"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
