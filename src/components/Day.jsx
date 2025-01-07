import dayjs from "dayjs";
import React from "react";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = React.useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    darkMode,
    holidays,
    holidayLabel,
  } = React.useContext(GlobalContext);

  // Convert day to dayjs object
  const dayInstance = dayjs(day);

  // Check if the current day is a holiday
  const isHoliday = holidays.find((holiday) => {
    const holidayStart = dayjs(holiday.start);
    // const holidayEnd = dayjs(holiday.end);

    // Compare using .valueOf() for simple numeric comparison
    // return (
    //   dayInstance.valueOf() >= holidayStart.valueOf() &&
    //   dayInstance.valueOf() <= holidayEnd.valueOf()
    // );
    return dayInstance.isSame(holidayStart, "day");
  });

  React.useEffect(() => {
    const events = filteredEvents.filter(
      (ev) => dayjs(ev.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div
      className={`flex flex-col ${
        darkMode
          ? "border-0 hover:bg-[#1b1b1b] border-r-[1px] border-r-[#333537] border-b-[1px] border-b-[#333537]"
          : "border-gray-200 hover:bg-gray-100 border-r-[1px] border-r-[#e3e3e3] border-b-[1px] border-b-[#e3e3e3]"
      }`}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-[#e3e3e3]" : "text-gray-600"
            }`}
          >
            {dayInstance.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-xs p-1 my-1 text-center ${
            darkMode ? "text-[#e3e3e3]" : "text-gray-600"
          } ${getCurrentDayClass()} `}
        >
          {dayInstance.format("DD")}
        </p>
      </header>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex-1">
          {holidayLabel && isHoliday && isHoliday.summary && (
            <div className="mt-0 text-xs text-center text-white bg-yellow-600 rounded p-1 mr-2 truncate">
              {isHoliday.summary}
            </div>
          )}
        </div>
      </div>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Day;
