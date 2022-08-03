import React from "react";
import { UserInfo } from "../../assets/UserInfo";
import CourseTemp from "./CourseTemp";
import "../../css/courses_main.css";
import { useSelector } from "react-redux";
import Product from "../market/Product";

function CoursesMain() {
  const user_data = useSelector((store) => store.user_data);
  const { market } = user_data;
  const { products } = market;

  const recentlyViewed = products.slice(0, 8);

  return (
    <div className="courses-main">
      {recentlyViewed.map((product) => (
        <Product key={product.id} product_info={product} />
      ))}
      {/* {UserInfo.all_courses.map((course) => (
        <CourseTemp
          key={course.title}
          image={course.image}
          title={course.title}
        />
      ))} */}
    </div>
  );
}

export default CoursesMain;
