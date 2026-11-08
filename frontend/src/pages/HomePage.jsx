import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header activeHeading={1} />
      <Hero />
    </div>
  );
};

export default HomePage;
