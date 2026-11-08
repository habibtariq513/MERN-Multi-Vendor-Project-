import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles.js";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-cover bg-center bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85)",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10"
        aria-hidden="true"
      />
      <div
        className={`${styles.section} relative z-10 w-[90%] py-16 800px:w-[60%]`}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          Thoughtful living starts here
        </div>
        <h1 className="max-w-[720px] text-[40px] font-semibold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl 800px:text-[68px]">
          Make room for
          <br />
          <span className="font-serif italic text-amber-200">
            beautiful living.
          </span>
        </h1>
        <p className="mt-6 max-w-[540px] text-base leading-7 text-white/90 drop-shadow-md sm:text-lg">
          Discover considered pieces, warm textures, and timeless accents that
          turn the place you live into the place you love.
        </p>
        <Link
          className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#3321c8] px-7 py-4 font-semibold text-white shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#2515a8] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#3321c8]"
          to="/products"
        >
          Explore the collection
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
