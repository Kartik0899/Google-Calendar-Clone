import dayjs from "dayjs";
import React from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import Toggle from "./Toggle";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, darkMode } =
    React.useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header
      className={`px-4 py-2 flex items-center justify-between w-full ${
        darkMode ? "bg-[#1b1b1b]" : "bg-[#f8fafd]"
      }`}
    >
      <div
        className={`flex items-center ${
          darkMode ? "text-white" : "text-gray-600"
        }`}
      >
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl fond-bold">Calendar</h1>
        <button
          onClick={handleReset}
          className={`border rounded-full py-2 px-4 mr-5 ${
            darkMode ? "" : "border border-black text-black"
          }`}
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="ml-4 text-xl font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>

      <div>
        <Toggle />
      </div>
    </header>
  );
};

export default CalendarHeader;
