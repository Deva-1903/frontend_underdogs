import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  if (!admin) {
    setTimeout(() => {
      navigate("/");
    }, 100);
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex flex-grow">
        <AdminSidebar />
        <div className="flex flex-col w-full">
          {/* Your other dashboard components go here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
