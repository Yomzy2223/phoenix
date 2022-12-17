import React from "react";
import { Outlet } from "react-router-dom";

const MarketPage = () => {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
};

export default MarketPage;
