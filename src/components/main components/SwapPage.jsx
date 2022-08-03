import React from "react";
import { useSelector } from "react-redux";
import CoursesMain from "../dashboard/CoursesMain";

function CoursesPage() {
  return (
    <div className="main-container">
      {/* <CoursesMain /> */}
      <div
        style={{
          position: "absolute",
          fontSize: "1.5rem",
          color: "var(--mainblue)",
          top: "40%",
          left: "40%",
        }}
      >
        Coming Soon...
      </div>
    </div>
  );
}

export default CoursesPage;
