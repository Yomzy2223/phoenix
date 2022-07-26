import React from "react";
import "../../css/activities_temp.css";

const ActivityTemp = ({ icon, username, city, state, amount, taskInfo }) => {
  return (
    <div className="activity-temp">
      <div className="activity-temp-icon">
        <img src={icon} alt="" />
      </div>
      <div className="activity-temp-text">
        <span>{username}</span> from <span>{city}</span>, <span>{state}</span>{" "}
        just earned <span>{`N${amount}`}</span> for <span>{taskInfo}</span>
        {/* {`${username} from ${city}, ${state} just earned N${amount} for ${taskInfo}`} */}
      </div>
    </div>
  );
};

export default ActivityTemp;
