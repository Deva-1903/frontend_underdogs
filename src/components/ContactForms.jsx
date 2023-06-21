import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getContactForms } from "../features/allUsers/allUsersSlice";
import Spinner from "../components/Spinner";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { FaReplyAll } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axios from "../axios";

const ContactForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const { admin } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.allUsers
  );

  const condition = admin?.username === "karthik" || admin?.username === "bala";

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else {
      dispatch(
        getContactForms({
          page: currentPage,
        })
      ).then(() => {
        setIsFetching(false); // Set loading state to false after data is fetched
      });
    }
  }, [admin, dispatch, currentPage, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);

  function handlePageForward() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePageBackward() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  const handleDelete = async (id) => {
    if (condition) {
      try {
        const response = await axios.delete(`/api/admin/contact-form/${id}`, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        dispatch(
          getContactForms({
            page: currentPage,
          })
        );

        if (response.status === 200) {
          toast.success("Contact form deleted successfully");
        } else {
          console.error("Error deleting contact form:", response);
          toast.error("Error deleting contact form");
        }
      } catch (error) {
        console.error("Error deleting contact form:", error);
        toast.error("Error deleting contact form");
      }
    } else {
      toast.error("You don't have access");
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-white text-center text-3xl font-bold py-6 pr-6 ">
        Contact Forms
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="flex items-center w-1/3 justify-center pr-6">
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
      {!users || users.length === 0 ? (
        isLoading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center items-center mt-36 ml-6">
            <span className="block sm:inline text-white pe-5 text-xl md:text-3xl font-bold	">
              No contact forms to display
            </span>
          </div>
        )
      ) : isFetching ? (
        <div className="flex justify-center items-center mt-36 ml-6">
          <span className="block sm:inline text-white pe-5 text-xl md:text-3xl font-bold	">
            Loading....
          </span>
        </div>
      ) : (
        <div className="flex justify-center items-center pb-8 mt-10  w-full">
          <div className=" overflow-x-auto p-4 ">
            <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
              <table
                id="users-table"
                className="w-full divide-y divide-x divide-gray-200 border"
              >
                <thead>
                  <tr>
                    <th className="px-2 md:px-6 py-2 md:py-3 border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-2 md:px-6 py-2 md:py-3  border bg-slate-800 text-left text-xs md:text-base   font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-2 md:px-6 py-2 md:py-3  border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-2 md:px-6 py-2 md:py-3  border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                      Reply
                    </th>
                    <th className="px-2 md:px-6 py-2 md:py-3  border bg-slate-800 text-left text-xs md:text-base  font-medium text-white uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-gray-200 border ">
                  {users.map((user) => (
                    <tr key={user._id} className="border">
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                        {user.fullName}
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                        {user.email}
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                        <div className="max-h-48 overflow-y-auto">
                          <textarea className="bg-slate-900 px-8 py-2" readOnly>
                            {user.message}
                          </textarea>
                        </div>
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                        <button>
                          <a
                            className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug text-green-500 "
                            href={`mailto:${user.email}`}
                          >
                            <FaReplyAll className="hover:opacity-75 hover:scale-100 duration-200" />
                          </a>
                        </button>
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                        <button
                          className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug text-white"
                          onClick={() => handleDelete(user._id)}
                        >
                          <RiDeleteBin2Fill className="text-2xl hover:opacity-75 hover:scale-100 duration-200 text-red-500 hover:text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForms;
