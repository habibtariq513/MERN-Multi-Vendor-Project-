import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { categoriesData } from "../../static/data.js";
import { backend_url } from "../../server.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    setSearchData(
      term
        ? (allProducts || []).filter((product) =>
            product.name.toLowerCase().includes(term)
          )
        : []
    );
  }, [allProducts, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchResults = searchData.map((product) => {
    const productName = product.name.replace(/\s+/g, "-");
    const imageUrl = product.images?.[0]
      ? `${backend_url}${product.images[0]}`
      : product.image_Url?.[0]?.url || "";
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
          src={imageUrl}
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
      <button
        type="button"
        className="relative"
        aria-label="Wishlist"
        onClick={() => setOpenWishlist(true)}
      >
        <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3bc177] font-mono text-[12px] leading-tight text-white">
          0
        </span>
      </button>
      <button
        type="button"
        className="relative"
        aria-label="Shopping cart"
        onClick={() => setOpenCart(true)}
      >
        <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3bc177] font-mono text-[12px] leading-tight text-white">
          0
        </span>
      </button>
      <Link to="/login" aria-label="Sign in">
        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
      </Link>
    </div>
  );

  return (
    <>
      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              className="ml-4"
              onClick={() => setOpen(true)}
              size={40}
            />
          </div>
          <div>
            <Link to="/">
              {logoFailed ? (
                <span className="mr-3 text-xl font-bold text-[#3321c8]">
                  ShopO
                </span>
              ) : (
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt=""
                  className="mt-3 cursor-pointer"
                  onError={() => setLogoFailed(true)}
                />
              )}
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                1
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart className="mt-5 ml-3" size={30} />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                  size={30}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-[5px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && searchData.length !== 0 && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((item) => {
                      const productName = item.name.replace(/\s+/g, "-");
                      const imageUrl = item.images?.[0]
                        ? `${backend_url}${item.images[0]}`
                        : item.image_Url?.[0]?.url || "";
                      return (
                        <Link
                          key={item.name}
                          to={`/product/${encodeURIComponent(productName)}`}
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center">
                            <img
                              src={imageUrl}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{item.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile" onClick={() => setOpen(false)}>
                      {typeof user?.avatar === "string" ? (
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      ) : (
                        <CgProfile
                          size={60}
                          className="text-[#0eae88]"
                        />
                      )}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                      to="/login"
                    >
                      Login /
                    </Link>
                    <Link
                      className="text-[18px] text-[#000000b7]"
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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

      {/* cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

      {/* wishlist popup */}
      {openWishlist ? (
        <Wishlist setOpenWishlist={setOpenWishlist} />
      ) : null}

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
