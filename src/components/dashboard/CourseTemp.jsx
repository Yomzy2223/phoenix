import React from "react";
import "../../css/course_temp.css";

function CourseTemp({ image, title }) {
  return (
    <div className="course-temp">
      <img src={image} alt={title} />
      <p className="course-temp-description">{title}</p>
    </div>
  );
}

export default CourseTemp;
