import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/allUsers/allUsersSlice";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardCircleSharp } from "react-icons/io5";

function AllUsers() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);
  const { users, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(
      getAllUsers({ status: statusFilter, sort: sortOrder, page: currentPage })
    );
  }, [dispatch, statusFilter, sortOrder, currentPage]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
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
        All Users
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
          <div className="flex items-center justify-center ">
            <label
              className="text-gray-500 uppercase font-bold text-sm mr-4"
              htmlFor="sort-order"
            >
              Sort By:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              id="sort-order"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-6  w-full">
        <div className=" overflow-x-auto p-4">
          <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
            <table className="w-full divide-y divide-x divide-gray-200 border">
              <thead>
                <tr>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Health Issues
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Emergency Contact
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs  md:text-base font-medium text-white uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Subscription Type
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Plan Ends
                  </th>
                  <th className="px-6 py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y  divide-gray-200 border">
                {users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.healthIssues}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.emergencyContactNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.subscription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {user.subscription_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                      {formatDate(user.planEnds)}
                    </td>{" "}
                    <td className={`${user.status === "active" ? "text-gray-100" : "text-red-500"} px-6 py-4 whitespace-nowrap text-sm md:text-base border`}>
                      {user.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
