import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { categoriesData, productData } from "../../static/data.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchData(
      term.trim()
        ? productData.filter((product) =>
            product.name.toLowerCase().includes(term.trim().toLowerCase())
          )
        : []
    );
  };

  const searchResults = searchData.map((product) => {
    const productName = product.name.replace(/\s+/g, "-");
    return (
      <Link
        key={product.name}
        to={`/product/${encodeURIComponent(productName)}`}
        onClick={() => {
          setSearchTerm("");
          setSearchData([]);
        }}
        className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100"
      >
        <img
          src={product.image_Url[0]?.url}
          alt=""
          className="h-10 w-10 rounded object-cover"
        />
        <span className="text-sm text-gray-800">{product.name}</span>
      </Link>
    );
  });

  const searchBox = (
    <div className="relative w-full 800px:w-[50%]">
      <input
        type="search"
        placeholder="Search Product..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="h-[40px] w-full rounded-md border-2 border-[#3957db] px-2 pr-10"
        aria-label="Search products"
      />
      <AiOutlineSearch
        className="absolute right-2 top-1.5 cursor-pointer"
        size={30}
        aria-hidden="true"
      />
      {searchData.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-[50vh] overflow-y-auto rounded bg-slate-50 p-2 shadow-lg">
          {searchResults}
        </div>
      )}
      {searchTerm && searchData.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 rounded bg-slate-50 p-3 text-sm text-gray-600 shadow-lg">
          No products found.
        </div>
      )}
    </div>
  );

  const categoryToggle = (
    <div className="relative w-full 800px:w-[270px]">
      <button
        type="button"
        className="relative flex h-[50px] w-full items-center justify-between rounded-md bg-white pl-10 pr-4 font-sans text-lg font-[500] select-none 800px:h-[60px]"
        onClick={() => setDropDown((open) => !open)}
        aria-expanded={dropDown}
      >
        <BiMenuAltLeft className="absolute left-2" size={30} />
        <span>All Categories</span>
        <IoIosArrowDown size={20} />
      </button>
      {dropDown && (
        <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
      )}
    </div>
  );

  const accountIcons = (
    <div className={`${styles.noramlFlex} justify-end gap-4 text-white`}>
      <Link to="/wishlist" className="relative" aria-label="Wishlist">
        <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3bc177] font-mono text-[12px] leading-tight text-white">
          0
        </span>
      </Link>
      <Link to="/cart" className="relative" aria-label="Shopping cart">
        <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3bc177] font-mono text-[12px] leading-tight text-white">
          0
        </span>
      </Link>
      <Link to="/login" aria-label="Sign in">
        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
      </Link>
    </div>
  );

  return (
    <>
      <div className={`${styles.section} py-3 800px:py-0`}>
        <div className="flex flex-col gap-3 800px:my-[20px] 800px:h-[50px] 800px:flex-row 800px:items-center 800px:justify-between">
          <Link to="/" className="flex justify-center 800px:justify-start">
            {logoFailed ? (
              <span className="text-2xl font-bold text-[#3321c8]">ShopO</span>
            ) : (
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="ShopO home"
                className="h-10 w-auto"
                onError={() => setLogoFailed(true)}
              />
            )}
          </Link>
          {searchBox}
          <Link to="/shop-create" className={`${styles.button} hidden 800px:flex`}>
            <span className="flex items-center text-[#fff]">
              Become Seller <IoIosArrowForward className="ml-1" />
            </span>
          </Link>
        </div>
      </div>

      <div
        className={`${
          active ? "fixed left-0 top-0 z-30 shadow-sm" : "relative"
        } w-full bg-[#3321c8] transition`}
      >
        <div className={`${styles.section} flex flex-col gap-3 py-3 800px:h-[70px] 800px:flex-row 800px:items-center 800px:justify-between 800px:py-0`}>
          <div className="hidden 800px:block">{categoryToggle}</div>
          <div className="hidden 800px:block">
            <Navbar active={activeHeading} />
          </div>
          <div className="flex items-center justify-between gap-4 800px:hidden">
            {categoryToggle}
            {accountIcons}
          </div>
          <div className="hidden 800px:block">{accountIcons}</div>
          <div className="flex justify-center 800px:hidden">
            <Navbar active={activeHeading} />
          </div>
          <Link
            to="/shop-create"
            className="flex items-center justify-center text-sm font-medium text-white 800px:hidden"
          >
            Become Seller <IoIosArrowForward className="ml-1" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
