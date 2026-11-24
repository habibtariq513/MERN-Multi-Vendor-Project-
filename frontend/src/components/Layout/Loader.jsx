import React from "react";
import LottieModule from "react-lottie";
import animationData from "../../Assests/animations/2451-ecommerce-loader.json";

const Lottie = LottieModule.default;

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie height={300} options={defaultOptions} width={300} />
    </div>
  );
};

export default Loader;
