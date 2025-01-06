import React from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : null;
  return parsedEvents || [];
}

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = React.useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = React.useState(null);
  const [daySelected, setDaySelected] = React.useState(dayjs());
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [labels, setLabels] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(true);
  const [holidays, setHolidays] = React.useState([]);
  const [holidayLabel, setHolidayLabel] = React.useState(true);

  React.useEffect(() => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=${process.env.REACT_APP_CALENDAR_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Parse holidays to have a more usable structure
        const formattedHolidays = data.items.map((item) => ({
          summary: item.summary,
          start: dayjs(item.start.date), // Convert to dayjs object
          end: dayjs(item.end.date), // Convert to dayjs object
        }));
        setHolidays(formattedHolidays);
      })
      .catch((error) => console.error("Error fetching holidays:", error));
  }, []);

  React.useEffect(() => {
    setHolidays(holidays);
  }, [holidays]);

  // Load the saved theme from localStorage on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const [savedEvents, dispatchCalEvent] = React.useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = React.useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  React.useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [savedEvents, darkMode]);

  React.useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  React.useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  React.useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        darkMode,
        setDarkMode,
        holidays,
        setHolidays,
        holidayLabel,
        setHolidayLabel,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
