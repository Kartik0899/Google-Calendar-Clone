import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import GlobalContext from "../context/GlobalContext";

const Sidebar = () => {
  const { darkMode } = React.useContext(GlobalContext);
  return (
    <aside className={`p-5 w-64 ${darkMode ? "bg-[#1b1b1b]" : "bg-[#f8fafd]"}`}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;
