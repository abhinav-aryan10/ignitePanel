// import React from "react";
import { Outlet } from "react-router-dom";

const LoginContainer = () => {
  console.log("container loaded", window.location);
  return (
    <>
      <div> This is login container</div>
      <Outlet />
    </>
  );
};

export default LoginContainer;
