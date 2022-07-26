import React from "react";
import { useSelector } from "react-redux";
import CoursesMain from "../dashboard/CoursesMain";

function CoursesPage() {
  return (
    <div className="main-container">
      <CoursesMain />
      <div className="user-activities">Hello from activities section</div>
    </div>
  );
}

export default CoursesPage;
