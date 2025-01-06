import React from "react";
import "./App.css";
import { getMonth, getWeek } from "./utils";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
// import Week from "./components/Week";
import EventModal from "./components/Modal/EventModal";

function App() {
  const [currenMonth, setCurrentMonth] = React.useState(getMonth());

  const { monthIndex, showEventModal, darkMode, holidays } =
    React.useContext(GlobalContext);

  // const [currentWeek, setCurrentWeek] = React.useState(getWeek());
  // const [view, setView] = React.useState("month");

  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // const [holidays, setHolidays] = React.useState([]);

  // React.useEffect(() => {
  //   fetch(
  //     `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=${key}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Parse holidays to have a more usable structure
  //       const formattedHolidays = data.items.map((item) => ({
  //         summary: item.summary,
  //         start: dayjs(item.start.date), // Convert to dayjs object
  //         end: dayjs(item.end.date), // Convert to dayjs object
  //       }));
  //       setHolidays(formattedHolidays);
  //     })
  //     .catch((error) => console.error("Error fetching holidays:", error));
  // }, []);

  // React.useEffect(() => {
  //   setHolidays(holidays);
  // }, [holidays]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div
        className={`h-screen flex flex-col ${
          darkMode ? "bg-[#1b1b1b]" : "bg-[#f8fafd]"
        }`}
      >
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} darkMode={darkMode} />
          {/* {view === "week" ? (
            <Week week={currentWeek} />
          ) : (
            <Month month={currenMonth} />
          )} */}
        </div>
      </div>
    </>
  );
}

export default App;
