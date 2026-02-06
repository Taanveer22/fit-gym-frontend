import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateSchedule = () => {
  const handleAddScheduleForm = (e) => {
    e.preventDefault();
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
              type="text"
              name="title"
              className="input w-full"
              placeholder="Title"
            />
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker className="input w-full"></DatePicker>
          </fieldset>
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
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
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
          <button className="btn btn-primary mt-6 w-full">
            Update Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSchedule;
