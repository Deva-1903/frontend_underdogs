// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendancesByDate } from "../features/allUsers/allUsersSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronForwardCircleSharp } from "react-icons/io5";

function ViewAttendance() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(
      getAttendancesByDate({
        status: statusFilter,
        date: date,
        page: currentPage,
        session: sessionFilter,
      })
    );
  }, [dispatch, date, statusFilter, sessionFilter, currentPage]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  function handlePageForward() {
    setCurrentPage(currentPage + 1);
  }

  function handlePageBackward() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleSessionFilterChange = (event) => {
    setSessionFilter(event.target.value);
  };

  // function downloadAsPDF() {
  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     html: "#users-table", // ID of the table element
  //     margin: { top: 60 },
  //   });
  //   doc.save("attendance.pdf");
  // }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      <h1 className="text-white text-center text-3xl font-bold py-6 ">
        Attendance
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="items-center w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <div className="flex items-center justify-center">
            <label
              className="text-gray-500 uppercase font-bold text-sm mr-4"
              htmlFor="status-filter"
            >
              Status Filter:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <label
              className="text-gray-500 uppercase font-bold text-sm mr-4"
              htmlFor="session-filter"
            >
              Session Filter:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              id="session-filter"
              value={sessionFilter}
              onChange={handleSessionFilterChange}
            >
              <option value="all">All</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="flex items-center justify-center ml-20">
            <label
              className="text-gray-500 uppercase font-bold text-sm mr-4"
              htmlFor="sort-order"
            >
              Date:
            </label>
            <DatePicker
              className="border-transparent border-2 w-8/12 md:w-6/12 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              id="date-picker"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8  w-full">
        <div className=" overflow-x-auto p-4 ">
          <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
            <table
              id="users-table"
              className="w-full divide-y divide-x divide-gray-200 border"
            >
              <thead>
                <tr>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    No
                  </th>
                  {/* 
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Image
                  </th>
                  */}
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Time In
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Subscription Type
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Plan Ends
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y  divide-gray-200 border">
                {users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.number}
                    </td>
                    {/*
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      <a
                        href={user.photoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div class="rounded-full h-16 w-16 overflow-hidden">
                          <img
                            src={user.photoURL}
                            alt="image"
                            class="h-full w-full rounded-full object-cover"
                          />
                        </div>
                      </a>
                    </td>
                  */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.user_name}
                    </td>
                    <td
                      className={`${
                        user.status === "active"
                          ? "text-gray-100"
                          : "text-red-500"
                      } px-6 py-4 whitespace-nowrap text-sm md:text-base border text-center`}
                    >
                      {user.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.timeIn}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.subscription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.subscription_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {formatDate(user.planEnds)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border text-center">
                      {user.session}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                      {formatDate(user.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pb-8">
        <div className="flex items-center">
          <button
            className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 mr-2"
            onClick={handlePageBackward}
          >
            <IoChevronForwardCircleSharp className="rotate-180" />
          </button>
          <span className="text-white uppercase font-bold text-sm mr-1 ml-1">
            {currentPage}
          </span>
          <button
            className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 ml-2"
            onClick={handlePageForward}
          >
            <IoChevronForwardCircleSharp />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewAttendance;
