import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal, darkMode } = useContext(GlobalContext); //#37393b
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className={`border p-3 rounded-xl flex items-center shadow-md hover:shadow-2xl ${
        darkMode
          ? "bg-[#37393b] border-[#37393b] shadow-sm shadow-slate-400"
          : "bg-[#e3e3e3]"
      }`}
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span
        className={`pl-3 pr-7 ${darkMode ? "text-[#e3e3e3]" : "text-gray-600"}`}
      >
        Create
      </span>
    </button>
  );
}
