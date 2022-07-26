import React, { useRef } from "react";
import { Activities } from "../../assets/Activities";
import ActivityTemp from "./ActivityTemp";
import "../../css/recent_activities.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const RecentActivities = () => {
  // const activities = document.getElementsByClassName("activities-container");

  const activities = useRef(null);

  const handleMore = () => {
    activities.current.scrollBy({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="users-activities">
      <div id="users-activities-top">
        <p>Recent Activities</p>
        <p>A glimpse of people's activities on Phoenix</p>
      </div>
      <div className="users-activities-body" ref={activities}>
        {Activities.map((activity) => (
          <div key={activity.id}>
            <ActivityTemp
              icon={activity.icon}
              username={activity.username}
              city={activity.city}
              state={activity.state}
              amount={activity.amount}
              taskInfo={activity.taskInfo}
            />
          </div>
        ))}
      </div>
      <div className="users-activities-bottom">
        <button onClick={handleMore}>
          <div>Click / Scroll to see more</div>
          <ArrowDownwardIcon />
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
