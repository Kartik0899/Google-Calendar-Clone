import React from "react";
import Day from "./Day";

const Month = ({ month, darkMode }) => {
  return (
    <div
      className={`flex-1 grid grid-cols-7 grid-rows-5 rounded-[40px] ${
        darkMode
          ? "bg-[#131314] border-0 border-l border-[#333537]"
          : "bg-[#ffffff] border-l border-[#dde3ea]"
      }`}
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
