// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import log from "loglevel";
import { RoutePaths } from "../constants/Routepaths.constants";
// import React from "react";

const NavigateToRespectivePath: React.FC = ({}) => {

  const navigate = useNavigate();

  const goToLoginContainer = () => {
    console.log('go to login container');
    navigate(RoutePaths.LOGIN);
  }

  // return <div className="navigate_to_respective_component_container" />;
  return <div>
    <div>This is Navigate to Respective Path</div>
    <button type="button" onClick={() => goToLoginContainer()}>Login Container</button>
    <Link to={RoutePaths.LOGIN}>Login Container</Link>
  </div>;
};

export default NavigateToRespectivePath;
