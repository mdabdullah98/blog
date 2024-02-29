import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
    setLoader(false);
  }, [navigate]);
  return !loader ? <>{children}</> : "loading...";
}

export default AuthLayout;
