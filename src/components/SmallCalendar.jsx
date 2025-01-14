import dayjs from "dayjs";
import React from "react";
import { getMonth } from "../utils";
import GlobalContext from "../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState(dayjs().month());

  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  React.useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    daySelected,
    setDaySelected,
    darkMode,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-[#e3e3e3]";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return `hover:p-1 hover:rounded-full ${
        darkMode
          ? "text-[#e3e3e3] hover:bg-gray-600"
          : "text-gray-500 hover:bg-gray-200"
      }`;
    }
  }

  return (
    <div className="mt-9">
      <header
        className={`flex justify-between ${
          darkMode ? "text-[#e3e3e3]" : "text-gray-500"
        }`}
      >
        <p className="font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
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
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            className={`text-xs py-1 text-center ${
              darkMode ? "text-[#e3e3e3]" : "text-gray-500"
            }`}
          >
            {day.format("dd").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 text-center w-full ${getDayClass(day)}`}
              >
                <span className="text-xs">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
