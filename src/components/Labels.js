import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel, darkMode, holidayLabel, setHolidayLabel } =
    useContext(GlobalContext);

  return (
    <React.Fragment>
      <p
        className={`font-bold mt-10 ${
          darkMode ? "text-[#e3e3e3]" : "text-gray-600"
        }`}
      >
        Label
      </p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block text-sm">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span
            className={`ml-2 capitalize ${
              darkMode ? "text-[#e3e3e3]" : "text-gray-700"
            }`}
          >
            {lbl}
          </span>
        </label>
      ))}
      <p
        className={`font-bold mt-10 ${
          darkMode ? "text-[#e3e3e3]" : "text-gray-600"
        }`}
      >
        Other calendars
      </p>

      <label className="items-center mt-3 block text-sm">
        <input
          type="checkbox"
          checked={holidayLabel}
          onChange={() => setHolidayLabel(!holidayLabel)}
          className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer`}
        />
        <span
          className={`ml-2 capitalize ${
            darkMode ? "text-[#e3e3e3]" : "text-gray-700"
          }`}
        >
          Holidays in India
        </span>
      </label>
    </React.Fragment>
  );
}
