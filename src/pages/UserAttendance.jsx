import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { publicGetUser, reset } from "../features/user/userSlice";
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";

function UserAttendance() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    subscription: "",
    subscription_type: "",
    cardio: "",
    status: "",
    planEnds: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, message, navigate, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      let searchParams = {};

      searchParams.id = id;

      const response = await dispatch(publicGetUser(searchParams));
      setUserData(response.payload);
    };
    fetchUser();
  }, [id]);

  return (
    <body style={{ overflow: "hidden" }}>
      <div className="relative h-screen">
        <Navbar />
        <Hero />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-gray-700 rounded-lg p-8 w-120">
            <Link
              to="/"
              className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
            <div className="flex items-center mb-6">
              <FaUserCircle className="text-3xl text-gray-300 mr-2" />
              <h1 className="text-xl font-semibold text-orange-500">
                {userData.name}
              </h1>
            </div>
            <p className="text-gray-300 mb-6">User ID: {userData.id}</p>
            <div className="flex items-center mb-6">
              <p className="text-gray-200 mr-2">Status:</p>
              {userData.status === "active" ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}

              <p className="text-gray-300">{userData.status}</p>
            </div>
            <p className="text-gray-300 mb-6">
              Subscribed: {userData.subscription} of{" "}
              {userData.subscription_type}
            </p>
            <p className="text-gray-200 mb-6">
              Cardio status: {userData.cardio}
            </p>
            <p className="text-gray-200 mb-6">
              Subscription ends on {userData.planEnds}
            </p>
            <p className="text-orange-200 text-sm">
              "Don't wish for a good body, work for it"
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default UserAttendance;
