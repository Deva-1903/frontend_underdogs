import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function AdminHeader({ showSidebar, handleToggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-500 h-16">
      <div className="flex items-center">
        <div className="cursor-pointer mr-4" onClick={handleToggleSidebar}>
          {showSidebar ? (
            <FiX className="text-white h-7 w-7" />
          ) : (
            <FiMenu className="text-white h-7 w-7" />
          )}
        </div>
        <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
      </div>
      <div>
        <button
          className="py-2 px-6 flex items-center  text-gray-300 hover:text-white hover:scale-110 duration-200"
          onClick={handleLogout}
        >
          <IoMdLogOut className="h-5 w-5 mr-2 " />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
