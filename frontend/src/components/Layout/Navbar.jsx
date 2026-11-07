import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data.js";
import styles from "../../styles/styles.js";

const Navbar = ({ active }) => {
  return (
    <nav className={styles.noramlFlex} aria-label="Main navigation">
      {navItems.map((item, index) => (
        <div className="flex" key={item.url}>
          <Link
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
            } cursor-pointer px-3 font-[500] lg:px-6`}
            to={item.url}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
