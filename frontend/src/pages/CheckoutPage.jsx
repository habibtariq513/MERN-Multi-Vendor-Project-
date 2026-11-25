import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import styles from "../styles/styles.js";

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.user);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (!user?.addresses?.length) return;
    const address = user.addresses[0];
    setCountry(address.country || "");
    setCity(address.city || "");
    setAddress1(address.address1 || "");
    setAddress2(address.address2 || "");
    setZipCode(address.zipCode || "");
  }, [user?.addresses]);

  const handleSavedAddress = (event) => {
    const address = user?.addresses?.find(
      (item) => item._id === event.target.value
    );
    if (!address) return;
    setCountry(address.country || "");
    setCity(address.city || "");
    setAddress1(address.address1 || "");
    setAddress2(address.address2 || "");
    setZipCode(address.zipCode || "");
  };

  return (
    <div>
      <Header activeHeading={0} />
      <div className={`${styles.section} min-h-[50vh] py-10`}>
        <h1 className="text-[25px] font-[600]">Checkout</h1>
        <div className="mt-6 grid max-w-[700px] gap-4 rounded bg-white p-5 shadow">
          {user?.addresses?.length > 0 && (
            <div>
              <label className="block pb-2">Saved Address</label>
              <select
                className={styles.input}
                defaultValue=""
                onChange={handleSavedAddress}
              >
                <option value="" disabled>Select an address</option>
                {user.addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.addressType}: {address.address1}, {address.city}
                  </option>
                ))}
              </select>
            </div>
          )}
          {[
            ["Country", country, setCountry],
            ["City", city, setCity],
            ["Address 1", address1, setAddress1],
            ["Address 2", address2, setAddress2],
            ["Zip Code", zipCode, setZipCode],
          ].map(([label, value, setter]) => (
            <div key={label}>
              <label className="block pb-2">{label}</label>
              <input
                type={label === "Zip Code" ? "number" : "text"}
                className={styles.input}
                value={value}
                onChange={(event) => setter(event.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
