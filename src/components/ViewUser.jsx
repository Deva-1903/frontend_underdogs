import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaUser,
  FaBirthdayCake,
  FaTransgenderAlt,
  FaMobileAlt,
  FaEnvelope,
  FaHeartbeat,
  FaAmbulance,
  FaRulerVertical,
  FaWeight,
  FaMapMarkerAlt,
  FaTint,
  FaUserCheck,
  FaClipboardList,
  FaCalendarCheck,
  FaToggleOn,
  FaWalking,
  FaRunning,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";

import { fetchUserDataForUpdate, reset } from "../features/user/userSlice";
import Spinner from "../components/Spinner";

function ViewUser() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    healthIssues: "",
    emergencyContactNo: "",
    height: "",
    weight: "",
    bloodGroup: "",
    address: "",
    subscription: "",
    subscription_type: "",
    cardio: "",
    planEnds: "",
    status: "",
    photoURL: "",
    joiningDate: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dispatch(fetchUserDataForUpdate(id));
      setUserData(response.payload);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(`User ${id} updated successfully`);
    }

    if (!admin) {
      navigate("/login");
    }

    dispatch(reset());
  }, [admin, user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex justify-center items-center max-w-5xl mx-auto px-4 py-10">
      <div className="bg-slate-900 rounded-lg overflow-hidden shadow-md shadow-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center mb-4 pb-4">
            <div className="h-20 w-20 rounded-full border-2 mr-4 overflow-hidden">
              <img
                src={userData.photoURL}
                className="h-full w-full object-cover bg-white"
                alt="User Photo"
              />
            </div>
            <div>
              <div className="font-bold text-white text-2xl">
                {userData.name}
              </div>
              <div className="mt-2">
                <span className="text-white font-bold text-lg">
                  Id: {userData.id}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaBirthdayCake className="text-white mr-2" size={24} />
              <span className="text-white text-base">Age: {userData.age}</span>
            </div>
            <div className="flex items-center">
              <FaTransgenderAlt className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Gender: {userData.gender}
              </span>
            </div>
            <div className="flex items-center">
              <FaMobileAlt className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Mobile: {userData.mobile}
              </span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Email: {userData.email}
              </span>
            </div>
            <div className="flex items-center">
              <FaHeartbeat className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Health Issues: {userData.healthIssues}
              </span>
            </div>
            <div className="flex items-center">
              <FaAmbulance className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Emergency Contact No: {userData.emergencyContactNo}
              </span>
            </div>
            <div className="flex items-center">
              <FaRulerVertical className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Height: {userData.height}
              </span>
            </div>
            <div className="flex items-center">
              <FaWeight className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Weight: {userData.weight}
              </span>
            </div>
            <div className="flex items-center">
              <FaTint className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Blood Group: {userData.bloodGroup}
              </span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-white mr-2" size={24} />
              <span className="text-white text-base text-clip">
                Address: {userData.address}
              </span>
            </div>
            <div className="flex items-center">
              <FaUserCheck className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Subscription: {userData.subscription}
              </span>
            </div>
            <div className="flex items-center">
              <FaClipboardList className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Subscription Type: {userData.subscription_type}
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarCheck className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Plan Ends: {formatDate(userData.planEnds)}
              </span>
            </div>
            <div className="flex items-center">
              <FaToggleOn className="text-white mr-2" size={24} />
              <span className={`${userData.status === "active" ? "text-white" : "text-red-500"} text-base`}>
                Status: {userData.status}
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-white mr-2" size={24} />
              <span className="text-white text-base">
                Joining Date: {formatDate(userData.joiningDate)}
              </span>
            </div>
            {userData.cardio === "With cardio" ? (
              <div className="flex items-center">
                <FaRunning className="text-white mr-2" size={24} />
                <span className="text-white text-base">
                  Cardio: {userData.cardio}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <FaWalking className="text-white mr-2" size={24} />
                <span className="text-white text-base">
                  Cardio: {userData.cardio}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-10 py-2 mt-8">
            <Link
              to={`/admin/update/user/${id}`}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </Link>
            <Link
              to="/admin/get/user"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline text-center"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
