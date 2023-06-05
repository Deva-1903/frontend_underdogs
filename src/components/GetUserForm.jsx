import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getUserDetails, reset } from "../features/user/userSlice";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdAttachEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

function GetUserForm() {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { admin } = useSelector((state) => state.auth);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!admin) {
      navigate("/login");
    }

    if (isSuccess) {
      const id = user.id;
      const path = location.pathname;
      if (path === "/admin/update/user") {
        navigate(`/admin/update/user/${id}`);
      } else if (path === "/admin/update/subscription") {
        navigate(`/admin/update/subscription/${id}`);
      } else if (path === "/admin/get/user") {
        navigate(`/admin/get/user/${id}`);
      }
    }

    dispatch(reset());
  }, [admin, user, isError, isSuccess, message, navigate, dispatch, location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, email, mobile } = formData;

    // Check that exactly one field is filled out
    if (
      (!id && !email && !mobile) ||
      (id && email) ||
      (id && mobile) ||
      (email && mobile)
    ) {
      toast.error("Please enter exactly one field.");
      return;
    }

    let searchParams = {};

    if (id) {
      searchParams.id = id;
    }

    if (email) {
      searchParams.email = email;
    }

    if (mobile) {
      searchParams.mobile = mobile;
    }

    // Process the form data here with the identified search parameters
    dispatch(getUserDetails(searchParams));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full mt-24 xl:mt-32">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 max-w-lg rounded-lg px-6 py-8 shadow-md shadow-gray-700  "
      >
        {location.pathname === "/admin/update/user" && (
          <p className="text-gray-200 font-bold mb-4">
            Update user by entering any field:
          </p>
        )}

        {location.pathname === "/admin/update/subscription" && (
          <p className="text-gray-200 font-bold mb-4">
            Enter any field below to update subscription:
          </p>
        )}

        {location.pathname === "/admin/get/user" && (
          <p className="text-gray-200 font-bold mb-4">
            Enter any field below to get user data:
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-gray-200 font-semibold mb-2"
          >
            User ID
          </label>
          <div className="flex">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
            />
            <div className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl  text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500">
              <HiOutlineIdentification />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-200 font-semibold mb-2"
          >
            Email
          </label>
          <div className="flex">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
            />
            <div className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl  text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500">
              <MdAttachEmail />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="mobile"
            className="block text-gray-200 font-semibold mb-2"
          >
            Phone Number
          </label>
          <div className="flex">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500	"
            />
            <div className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl  text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500">
              <BsFillTelephoneFill />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded 
            focus:outline-none focus:shadow-outline hover:scale-110 duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetUserForm;
