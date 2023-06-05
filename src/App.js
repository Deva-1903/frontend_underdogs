import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";
import GetUserDetails from "./pages/GetUserDetails";
import UpdateSubscription from "./pages/UpdateSubscription";
import AllClients from "./pages/AllClients";
import ViewUserDetails from "./pages/ViewUserDetails";
import AttendancePage from "./pages/AttendancePage";
import UserAttendance from "./pages/UserAttendance";
import ContactFormsPage from "./pages/ContactFormsPage";
import FeesDetailsPage from "./pages/FeesDetailsPage";
import AdminUpdatePage from "./pages/AdminUpdatePage";
import ManageContentPage from "./pages/ManageContentPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin/dashboard" element={<RegisterUser />} />
            <Route path="/admin/register/user" element={<RegisterUser />} />
            <Route path="/admin/update/user" element={<GetUserDetails />} />
            <Route
              path="/admin/update/subscription"
              element={<GetUserDetails />}
            />
            <Route path="/admin/get/user" element={<GetUserDetails />} />
            <Route path="/admin/update/user/:id" element={<UpdateUser />} />
            <Route
              path="/admin/update/subscription/:id"
              element={<UpdateSubscription />}
            />
            <Route path="/admin/get/user/:id" element={<ViewUserDetails />} />
            <Route path="/admin/all/clients" element={<AllClients />} />
            <Route path="/admin/get/attendance" element={<AttendancePage />} />
            <Route path="/attendance/:id" element={<UserAttendance />} />
            <Route
              path="/admin/get/contactforms"
              element={<ContactFormsPage />}
            />
            <Route path="/admin/fees-details" element={<FeesDetailsPage />} />
            <Route path="/admin/update" element={<AdminUpdatePage />} />
            <Route
              path="/admin/manage/content"
              element={<ManageContentPage />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
