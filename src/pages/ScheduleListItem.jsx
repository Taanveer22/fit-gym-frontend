import { MdDeleteForever } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ScheduleListItem = ({ element, index, handleDelete, handleStatus }) => {
  // console.log(element, index);

  return (
    <div>
      {/* table list items */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{index + 1}</th>
              <td>{element?.title}</td>
              <td>{element?.day}</td>
              <td>{element?.date}</td>
              <td>{element?.time}</td>
              <td>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="btn btn-xs btn-secondary"
                  >
                    <MdDeleteForever size={15}></MdDeleteForever>
                  </button>
                  <Link
                    to={`/updateSchedule/${element._id}`}
                    className="btn btn-xs btn-secondary"
                  >
                    <FaFile size={15}></FaFile>
                  </Link>
                  <button
                    onClick={() => handleStatus(element._id)}
                    className="btn btn-xs btn-secondary"
                  >
                    {element?.isCompleted === true ? (
                      <FaCheckDouble></FaCheckDouble>
                    ) : (
                      <FaCheck size={15}></FaCheck>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleListItem;
