import { useEffect, useState } from "react";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/schedules`)
      .then((res) => res.json())
      .then((data) => setSchedules(data));
    console.log(schedules);
  }, []);

  return (
    <div>
      {/* search bar */}
      <div className="flex justify-center items-center my-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
      </div>
      {/* send data to child */}
      {schedules.map((element, index) => (
        <ScheduleListItem
          element={element}
          index={index}
          key={element._id}
        ></ScheduleListItem>
      ))}
    </div>
  );
};

export default ScheduleList;
