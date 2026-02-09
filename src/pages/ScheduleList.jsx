import { useEffect, useState } from "react";
import ScheduleListItem from "./ScheduleListItem";
import Swal from "sweetalert2";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // if search text exists → use search query
    const url = searchText
      ? `http://localhost:5000/schedules?search=${searchText}`
      : `http://localhost:5000/schedules`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSchedules(data);
      });
  }, [searchText]);

  console.log(schedules);
  console.log(searchText);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/schedules/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire("deleted schedule from db");
        }
      });

    const remainingSchedules = schedules.filter(
      (element) => element._id !== id,
    );
    setSchedules(remainingSchedules);
  };

  const handleStatus = (id) => {
    fetch(`http://localhost:5000/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire("task completed");
        }
      });

    const completedSchedules = schedules.map((element) =>
      // ✅ CORRECT: Spread the single object, then add/override properties
      element._id === id ? { ...element, isCompleted: true } : element,
    );
    setSchedules(completedSchedules);
  };

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
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </div>
      {/* send data to child */}
      {schedules.map((element, index) => (
        <ScheduleListItem
          element={element}
          index={index}
          key={element._id}
          handleDelete={handleDelete}
          handleStatus={handleStatus}
        ></ScheduleListItem>
      ))}
    </div>
  );
};

export default ScheduleList;
