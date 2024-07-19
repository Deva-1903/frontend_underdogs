import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaAddressCard,
  FaCalendarAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { RiAdminFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { GiMoneyStack } from "react-icons/gi";
import { FaClipboardQuestion } from "react-icons/fa6";

function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const Admin = [
    {
      Name: "Register User",
      links: "/admin/register/user",
      child: (
        <>
          <FaUser />
        </>
      ),
    },
    {
      Name: "Update User",
      links: "/admin/update/user",
      child: (
        <>
          <FaEdit />
        </>
      ),
    },
    {
      Name: "Update Subscription",
      links: "/admin/update/subscription",
      child: (
        <>
          <FaAddressCard />
        </>
      ),
    },
    {
      Name: "Fees Details",
      links: "/admin/fees-details",
      child: (
        <>
          <GiMoneyStack />
        </>
      ),
    },
    {
      Name: "Attendance",
      links: "/admin/get/attendance",
      child: (
        <>
          <FaCalendarAlt />
        </>
      ),
    },
    {
      Name: "Get User Details",
      links: "/admin/get/user",
      child: (
        <>
          <RiUserFollowLine />
        </>
      ),
    },
    {
      Name: "Clients",
      links: "/admin/all/clients",
      child: (
        <>
          <TiGroup />
        </>
      ),
    },
    {
      Name: "Update Admin",
      links: "/admin/update",
      child: (
        <>
          <RiAdminFill />
        </>
      ),
    },
    {
      Name: "Manage Content",
      links: "/admin/manage/content",
      child: (
        <>
          <FaBoxOpen />
        </>
      ),
    },
    {
      Name: "Contact Forms",
      links: "/admin/get/contactforms",
      child: (
        <>
          <RiMessage2Fill />
        </>
      ),
    },
    {
      Name: "Contact Forms",
      links: "/admin/get/contactforms",
      child: (
        <>
          <FaClipboardQuestion />
        </>
      ),
    },
  ];

  return (
    <section className="flex w-full bg-black overflow-y-scroll">
      <div className="bg-black h-screen duration-500 text-gray-100 px-4 flex flex-col items-center">
        <div className="py-2 lg:py-2 px-6 lg:px-6 flex items-center">
          <img
            src={logo}
            alt="Gym logo"
            className="mr-0 ml-0 lg:h-14 lg:mr-6"
          />
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col gap-6 lg:gap-7 relative">
            {Admin?.map((admins, i) => (
              <Link
                to={admins?.links}
                className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-orange-600 rounded-md scale-110 duration-200"
                key={i}
              >
                <div className="text-xl">{admins?.child}</div>
                <h2 className="whitespace-pre overflow-hidden">
                  {admins?.Name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminSidebar;
