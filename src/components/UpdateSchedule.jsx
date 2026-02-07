import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";

// ----------------------------
// Helper to safely parse ISO string to Date
// ----------------------------
const parseDate = (value) => {
  if (!value) {
    // if value is missing, use current date
    return new Date();
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    //  if invalid date, use current date
    return new Date();
  }
  // valid date, return it
  return date;
};

const UpdateSchedule = () => {
  const { id } = useParams();
  console.log(id);
  const loadedData = useLoaderData();
  console.log(loadedData);

  // ----------------------------
  // Initialize state directly from loadedData
  // This avoids calling setState in useEffect
  // ----------------------------
  const [title, setTitle] = useState(loadedData?.title || "");
  const [day, setDay] = useState(loadedData?.day || "friday");
  const [time, setTime] = useState(parseDate(loadedData?.time));
  const [date, setDate] = useState(parseDate(loadedData?.date));

  const handleAddScheduleForm = (e) => {
    e.preventDefault();

    // Convert Date objects back to ISO strings for backend
    const formattedDate = date.toISOString();
    const formattedTime = time.toISOString();

    const info = {
      title: title,
      day: day,
      time: formattedTime,
      date: formattedDate,
    };
    console.log(info);

    // TODO: Make API call to update the schedule(later)
  };

  return (
    <div className="bg-gray-200 py-12 lg:py-20">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-medium text-center my-3">
        Select Your Schedule
      </h1>
      <form onSubmit={handleAddScheduleForm} className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Title
            </legend>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input w-full"
              placeholder="Title"
            />
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker
              selected={date}
              onChange={(d) => d && setDate(d)}
              className="input w-full"
            ></DatePicker>
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Day
            </legend>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="input w-full"
            >
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
            </select>
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
              selected={time}
              onChange={(t) => t && setTime(t)}
              className="input w-full"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            ></DatePicker>
          </fieldset>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-6 w-full">
            Update Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSchedule;
