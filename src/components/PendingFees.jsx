import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { getAllPendingFees } from "../features/allUsers/allUsersSlice";
import { toast } from "react-toastify";

const PendingFees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.auth);
  const { users, isError, isLoading, message } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else {
      dispatch(
        getAllPendingFees({
          status: statusFilter,
          sort: sortOrder,
          page: currentPage,
        })
      ).then(() => {
         // Set loading state to false after data is fetched
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, dispatch, currentPage, sortOrder, statusFilter]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);

  const handlePageForward = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageBackward = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      <h1 className="text-white text-center text-3xl font-bold py-6">
        Pending Details
      </h1>
      <div className="flex justify-center items-center">
        <div className="items-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <label className="text-gray-500 uppercase font-bold text-sm">
              Sort By:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="flex justify-center items-center gap-2 mb-6">
            <label className="text-gray-500 uppercase font-bold text-sm -ml-2">
              Status Filter:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <div className="overflow-x-auto p-4">
          <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-16">
                <p className="text-white text-lg font-bold">Loading...</p>
              </div>
            ) : (
              <table className="w-full divide-y divide-x divide-gray-200 border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Pending Amount
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border">
                  {users.map((user) => (
                    <tr key={user.user_id} className="border">
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        ₹{user.pendingAmount}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm md:text-base text-center border ${user.paymentStatus === "paid" ? "text-white" : "text-red-500"}`}>
                        {user.paymentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-8">
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
};

export default PendingFees;
