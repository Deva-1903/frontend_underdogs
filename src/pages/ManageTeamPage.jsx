import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManageTeam from "../components/ManageTeam";

function ManageTeamPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  if (!admin) {
    setTimeout(() => {
      navigate("/");
    }, 100);
    return null;
  }

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <AdminHeader
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
      />
      {showSidebar && (
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-50">
          <AdminSidebar />
        </div>
      )}
      <div
        className={
          showSidebar
            ? "fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-40"
            : ""
        }
        onClick={handleCloseSidebar}
      ></div>
      <div className={showSidebar ? "filter blur-sm" : ""}>
        <div className="flex flex-col w-full">
          <ManageTeam />
        </div>
      </div>
    </div>
  );
}

export default ManageTeamPage;