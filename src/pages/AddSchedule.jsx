import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AddSchedule = () => {
  // ======================
  // State Management
  // ======================
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  // console.log(selectedDate);
  // console.log(selectedTime);
  // ======================
  // Handle Form Submit
  // ======================
  const handleAddScheduleForm = async (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toISOString();
    const formattedTime = selectedTime.toISOString();
    const title = e.target.title.value;
    const day = e.target.day.value;
    // ✅ Store ISO strings (backend-friendly)
    const info = {
      date: formattedDate,
      time: formattedTime,
      title: title,
      day: day,
    };
    console.log(info);
    // ======================
    // API Request
    // ======================
    const response = await fetch(`http://localhost:5000/createSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    // console.log(data);
    if (data.insertedId) {
      Swal.fire("schedule created in db");
    }
  };

  return (
    <div className="bg-rose-200 py-12 lg:py-20">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-medium text-center my-3">
        Select Your Schedule
      </h1>
      <form onSubmit={handleAddScheduleForm} className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* title */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Title
            </legend>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="Title"
            />
          </fieldset>
          {/* date picker */}
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            ></DatePicker>
          </fieldset>
          {/* day */}
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Day
            </legend>
            <select className="input w-full" name="day">
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
            </select>
          </fieldset>
          {/* time picker */}
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedTime}
              onChange={(time) => time && setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            ></DatePicker>
          </fieldset>
        </div>
        <div>
          <button className="btn btn-secondary mt-6 w-full">
            Add Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchedule;
