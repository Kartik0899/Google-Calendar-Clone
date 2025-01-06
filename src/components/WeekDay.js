import React from "react";

const WeekDay = ({ day }) => {
  return (
    <div className="day p-2 text-center">
      <div className="text-sm">{day.format("D")}</div>
    </div>
  );
};

export default WeekDay;
