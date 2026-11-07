import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server.js";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const activateAccount = async () => {
      try {
        await axios.post(`${server}/user/activation`, {
          activation_token,
        });
        if (active) setStatus("success");
      } catch {
        if (active) setStatus("error");
      }
    };

    if (activation_token) {
      activateAccount();
    } else {
      setStatus("error");
    }

    return () => {
      active = false;
    };
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {status === "loading" ? (
        <p>Activating your account...</p>
      ) : status === "error" ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
