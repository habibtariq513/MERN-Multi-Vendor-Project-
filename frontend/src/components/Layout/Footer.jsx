import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data.js";

const Footer = () => {
  const linkClassName =
    "text-sm cursor-pointer leading-6 text-gray-400 transition duration-300 hover:text-teal-400";

  const renderLinks = (links) =>
    links.map((link, index) => (
      <li key={`${link.name}-${index}`}>
        {link.link ? (
          <Link className={linkClassName} to={link.link}>
            {link.name}
          </Link>
        ) : (
          <span className={linkClassName}>{link.name}</span>
        )}
      </li>
    ));

  return (
    <footer className="bg-[#000] text-white">
      <div className="bg-[#342ac8] px-4 py-7 sm:px-12 md:flex md:items-center md:justify-between">
        <h2 className="mb-6 text-3xl font-semibold md:mb-0 md:w-2/5 lg:text-4xl lg:leading-normal">
          <span className="text-[#56d879]">Subscribe</span> us for news,
          <br />
          events and offers
        </h2>
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            required
            placeholder="Enter your email..."
            className="w-full rounded px-2 py-2.5 text-gray-800 focus:outline-none sm:mr-2 sm:w-72"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[#56d879] px-5 py-2.5 text-white duration-300 hover:bg-teal-500 md:w-auto"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 px-5 py-16 text-center sm:grid-cols-2 sm:px-8 sm:text-center lg:grid-cols-4">
        <div className="flex flex-col items-center px-5 text-center sm:items-start sm:text-start">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="ShopO"
            style={{ filter: "brightness(0) invert(1)" }}
            className="max-w-[150px]"
          />
          <p className="mt-4 text-gray-400">
            The home and elements needed to create beautiful products.
          </p>
          <div className="mt-[15px] flex items-center">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <AiFillFacebook className="cursor-pointer" size={25} />
            </a>
            <a
              href="https://www.twitter.com/"
              aria-label="Twitter"
              className="ml-[15px]"
            >
              <AiOutlineTwitter className="cursor-pointer" size={25} />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              className="ml-[15px]"
            >
              <AiFillInstagram className="cursor-pointer" size={25} />
            </a>
            <a
              href="https://www.youtube.com/"
              aria-label="YouTube"
              className="ml-[15px]"
            >
              <AiFillYoutube className="cursor-pointer" size={25} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-1 font-semibold">Company</h2>
          <ul>{renderLinks(footerProductLinks)}</ul>
        </div>

        <div>
          <h2 className="mb-1 font-semibold">Shop</h2>
          <ul>{renderLinks(footercompanyLinks)}</ul>
        </div>

        <div>
          <h2 className="mb-1 font-semibold">Support</h2>
          <ul>{renderLinks(footerSupportLinks)}</ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-8 pt-2 text-center text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <span>© 2020 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="flex w-full items-center justify-center sm:block">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Accepted payment methods"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
