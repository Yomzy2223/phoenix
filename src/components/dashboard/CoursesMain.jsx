import React from "react";
import { UserInfo } from "../../assets/UserInfo";
import CourseTemp from "./CourseTemp";
import "../../css/courses_main.css";

function CoursesMain() {
  return (
    <div className="courses-main">
      {UserInfo.all_courses.map((course) => (
        <CourseTemp
          key={course.title}
          image={course.image}
          title={course.title}
        />
      ))}
    </div>
  );
}

export default CoursesMain;
