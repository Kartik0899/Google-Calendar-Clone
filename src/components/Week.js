import React from "react";
import WeekDay from "./WeekDay";

const Week = ({ week }) => {
  return (
    <div className="flex justify-between p-4">
      {week.map((day, idx) => (
        <WeekDay day={day} key={idx} />
      ))}
    </div>
  );
};

export default Week;
