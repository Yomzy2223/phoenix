import React from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import AccountSideBar from "../sidebar/AccountSideBar";
import MobileSideBar from "../sidebar/MobileSideBar";
import "../../css/genealogy_page.css";
import { Avatar } from "@mui/material";
import { UserInfo } from "../../assets/UserInfo";
import GenealogyTemp from "../genealogy/GenealogyTemp";

function GenealogyPage() {
  var sidebar_width = useSelector((state) => state.dummy_data.sidebar_width);
  var sidebar_right = useSelector((state) => state.dummy_data.sidebar_right);

  return (
    <div className="dashboard-page">
      <div className="desktop-sidebar">
        <AccountSideBar />
      </div>
      <MobileSideBar
        sidebar_right={sidebar_right}
        sidebar_width={sidebar_width}
      />
      <div className="dashboard-mainpage">
        <Header showlist={false} />
        <div className="dashboard-main">
          <div className="dashboard-main__dashboard">
            <p className="dashboard-main__title">Genealogy</p>
            <div className="genealogy-tree">
              <div className="genealogy-tree__row">
                <Avatar
                  sx={{ width: 80, height: 80 }}
                  alt={UserInfo.user_data.name}
                  src={UserInfo.user_data.image}
                  className="genealogy-avatar__main"
                />
              </div>
              <div className="genealogy-tree__row__main">
                {UserInfo.downlines.map((downline) => (
                  <GenealogyTemp
                    key={downline.id}
                    name={downline.name}
                    image={downline.image}
                    downlines={downline.downlines}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-main__dashboard">
            {/* <p className="dashboard-main__title">Downlines</p>
            <div className="genealogy-downlines">
              <div className="genealogy-downlines__level">
                <p>Level 1</p>
                <div className="genealogy-downlines__body">
                  {UserInfo.downlines.map((downline) => (
                    <p key={downline.id}>{downline.name}</p>
                  ))}
                </div>
              </div>
              <div className="genealogy-downlines__level">
                <p>Level 2</p>
                <div className="genealogy-downlines__body">
                  {UserInfo.downlines.map((downline) =>
                    downline.downlines.map((downline) => (
                      <p key={downline.id}>{downline.name}</p>
                    ))
                  )}
                </div>
              </div>
            </div> */}
            <div className="genealogy__image">
              <img
                src="https://img.freepik.com/free-photo/young-happy-couple-two-friends-guy-woman-white-pink-empty-t-shirts-posing_365776-3051.jpg?size=626&ext=jpg&ga=GA1.2.305344552.1642806554"
                alt=""
                className="genealogy__img1"
              />
              <div className="genealogy__news">
                <span style={{ animationDelay: "1.4s" }}>C</span>
                <span style={{ animationDelay: "1.3s" }}>a</span>
                <span style={{ animationDelay: "1.2s" }}>s</span>
                <span style={{ animationDelay: "1.1s" }}>t</span>{" "}
                <span style={{ animationDelay: ".9s" }}>t</span>
                <span style={{ animationDelay: ".8s" }}>h</span>
                <span style={{ animationDelay: ".7s" }}>e</span>{" "}
                <span style={{ animationDelay: ".6s" }}>U</span>
                <span style={{ animationDelay: ".5s" }}>p</span>
                <span style={{ animationDelay: ".4s" }}>d</span>
                <span style={{ animationDelay: ".3s" }}>a</span>
                <span style={{ animationDelay: ".2s" }}>t</span>
                <span style={{ animationDelay: ".1s" }}>e</span>
              </div>
              <img
                src="https://as2.ftcdn.net/v2/jpg/02/35/89/97/1000_F_235899774_dWItjQjLj3WkeuBxacmFSqvTaaY6JWpn.jpg"
                alt=""
                className="genealogy__img2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenealogyPage;
