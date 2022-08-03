import React from "react";
import { useSelector } from "react-redux";
import "../../css/dashboard_main.css";
import CoursesMain from "./CoursesMain";
import Transactions from "./Transactions";
import All_Icons from "../../assets/All_Icons";

function DashboardMain() {
  const { LogoutIcon } = All_Icons;
  const userdata = useSelector((store) => store.user_data);
  const { first_name } = userdata;
  return (
    <div className="dashboard-main">
      <div className="inactive-warn-container">
        <InactiveWarn />
      </div>
      <div className="dashboard-main__dashboard">
        <div className="dashboard-main-welcome">
          <span>welcome, {first_name}</span>{" "}
          <span style={{ color: "var(--mainblue)" }}>
            <LogoutIcon sx={{ fontSize: 15 }} />
            Logout
          </span>
        </div>
        <p className="dashboard-main__title">Dashboard</p>
        <div className="dashboard-main__dashboard-info">
          <DashboardTemp
            title="wallet balance"
            body="$50.00"
            bcolor="#B9D7FF"
          />
          <DashboardTemp
            title="total earning"
            body="$265.00"
            bcolor="#BDF3F0"
          />
          <DashboardTemp title="pending balance" body="$245" bcolor="#A5A6F6" />
          <DashboardTemp title="total spent" body="$2443" bcolor="#A5A6F6" />
          <DashboardTemp title="my courses" body="6" bcolor="#A5A6F6" />
          <DashboardTemp title="current stage" body="L2" bcolor="#FCDDEC" />
        </div>
      </div>
      <div className="dashboard-main__courses">
        <p className="dashboard-main__title">recently viewed products</p>
        <CoursesMain />
      </div>
      <div className="dashboard-main__transactions">
        <p className="dashboard-main__title">Recent Transactions</p>
        <Transactions />
      </div>
    </div>
  );
}

export default DashboardMain;

// A new Component
// Inactive accounts warn info container comoponent
export const InactiveWarn = () => {
  return (
    <div className="inactive-warn">
      <p className="inactive-warn-header">Activate Your Membership</p>
      <p className="inactive-warn-body">
        You need to activate your membership before you can start earning on
        Phoenix. Click the button below to activate your membership account now.
        You don't need to become a member if you just want to buy followers,
        likes, shares, whatsapp status views etc. Simply scick on the button
        below to Buy your social portfolios.
      </p>
      <div className="inactive-warn-buttons">
        <button className="styled-button2 green">become a member</button>
        <button className="styled-button2 orange">Buy social portfolios</button>
      </div>
    </div>
  );
};

// A new component
// Dashboard info summary container component
export function DashboardTemp({ title, body, bcolor }) {
  return (
    <div className="dashboard-temp" style={{ backgroundColor: bcolor }}>
      <p className="dashboard-temp__title">{title}</p>
      <p className="dashboard-temp__body">{body}</p>
    </div>
  );
}
