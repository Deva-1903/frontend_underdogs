import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { register, reset } from "../features/auth/authSlice";
// import { getAdmins } from "../features/allUsers/allUsersSlice";
import { BiLockAlt, BiLockOpenAlt, BiUserCircle } from "react-icons/bi";
import { register, deleteAdmin, reset } from "../features/auth/authSlice";
import { getAdmins } from "../features/admins/adminSlice";
import { MdDeleteForever } from "react-icons/md";
import { VscCheck, VscClose } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";

function UpdateAdmin() {
  const [activeTab, setActiveTab] = useState("addAdmin");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpenTwo, setEyeOpenTwo] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('');

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const { username, password, confirmPassword } = formData;

  const {
    admins,
    isError: adminsError,
    isSuccess: adminsSuccess,
    message: adminsMessage,
  } = useSelector((state) => state.admins);

  const { admin, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const condition = admin?.username === "karthik" || admin?.username === "bala";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (adminsError) {
      toast.error(adminsMessage);
    }
    if (isSuccess) {
      toast.success("Admin added successfully");
      setFormData((prevFormData) => ({
        username: "",
        password: "",
        confirmPassword: "",
      }));
      setSelectedBranch('')
    }

    dispatch(reset());
  }, [
    admin,
    isError,
    isSuccess,
    message,
    adminsError,
    adminsMessage,
    navigate,
    dispatch,
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    // Password validation rules
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.warning(
        "Password requirements:\n- Minimum 8 characters\n- At least 1 lowercase letter\n- At least 1 uppercase letter\n- At least 1 numeric digit\n- At least 1 special character."
      );
      return;
    }

    const userData = {
      username,
      password,
      branch: selectedBranch
    };

    if (condition) {
      dispatch(register(userData));
    } else {
      toast.error("You don't have access to add an admin");
    }
  };

  useEffect(() => {
    if (activeTab === "admins") {
      dispatch(getAdmins());
    }
  }, [activeTab, dispatch]);

  const EyeOpenToggle = () => {
    setEyeOpen(!eyeOpen);
  };
  const EyeOpenToggleTwo = () => {
    setEyeOpenTwo(!eyeOpenTwo);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (adminId) => {
    setAdminToDelete(adminId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (condition) {
      dispatch(deleteAdmin(adminToDelete))
        .then(() => {
          toast.success("Admin deleted successfully");
          dispatch(getAdmins());
        })
        .catch((error) => {
          toast.error("Failed to delete admin");
          console.log(error);
        });
    } else {
      toast.error("You don't have access to delete an admin");
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setAdminToDelete(null);
    setShowConfirmation(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-body mt-24 p-10 ">
      <div className="shadow-lg shadow-gray-700 p-10">
        <div className="flex justify-center  items-center mb-4">
          <button
            onClick={() => handleTabChange("addAdmin")}
            className={`text-md md:text-lg font-semibold py-2 px-4 rounded-s-lg ${
              activeTab === "addAdmin"
                ? "bg-indigo-500 text-white"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            Add Admin
          </button>

          {/* admins Tab */}
          <button
            onClick={() => handleTabChange("admins")}
            className={`text-md md:text-lg font-semibold py-2 px-4 rounded-e-lg ${
              activeTab === "admins"
                ? "bg-indigo-500 text-white"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            Admins
          </button>
        </div>

        {activeTab === "addAdmin" && (
          <form onSubmit={handleAddAdminSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-gray-200 font-semibold mb-2"
              >
                Username
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                />
                <div className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl  text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500">
                  <BiUserCircle />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-gray-200 font-semibold mb-2"
              >
                Password
              </label>
              <div className="flex">
                <input
                  type={eyeOpen ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                />
                <div
                  onClick={EyeOpenToggle}
                  className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl cursor-pointer text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500"
                >
                  {eyeOpen ? <BiLockOpenAlt /> : <BiLockAlt />}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="text-gray-200 font-semibold mb-2"
              >
                Confirm Password
              </label>
              <div className="flex">
                <input
                  type={eyeOpenTwo ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none rounded-s-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                />
                <div
                  onClick={EyeOpenToggleTwo}
                  className="bg-slate-800 rounded-e-lg py-2 px-3 text-xl cursor-pointer text-indigo-500 focus:outline-none focus:shadow-outline border-transparent border-2 focus:border-orange-500"
                >
                  {eyeOpenTwo ? <BiLockOpenAlt /> : <BiLockAlt />}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="branch" className="text-gray-200 font-semibold mb-2">
                Select Branch Access
              </label>
              <div className="relative">
                <select
                  id="branch"
                  name="branch"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                  className="appearance-none rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                >
                  <option value="">Select branch</option>
                  <option value="branch1">Branch 1</option>
                  <option value="branch2">Branch 2</option>
                  {/* Add more options as needed */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-indigo-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 8l4 4 4-4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-400 hover:scale-110 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
        )}

        {activeTab === "admins" && (
          <div className="flex justify-center items-center pb-8 mt-10  w-full">
            <div className=" overflow-x-auto p-4 ">
              <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
                <table
                  id="users-table"
                  className="w-full divide-y divide-x divide-gray-200 border"
                >
                  <thead>
                    <tr>
                      <th className="px-2 md:px-6 py-2 md:py-3 border bg-slate-800 text-left text-xs md:text-base font-medium text-white uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-2 md:px-6 py-2 md:py-3 border bg-slate-800 text-left text-xs md:text-base font-medium text-white uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-2 md:px-6 py-2 md:py-3 border bg-slate-800 text-left text-xs md:text-base font-medium text-white uppercase tracking-wider">
                        Branch
                      </th>
                      <th className="px-2 md:px-6 py-2 md:py-3 border bg-slate-800 text-left text-xs md:text-base font-medium text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="border">
                        <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                          {admin.username}
                        </td>
                        <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                          {formatDate(admin.createdAt)}
                        </td>
                        <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                          {admin.branch}
                        </td>
                        <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-100 border">
                          {/* Action button for each admin */}
                          <button
                            onClick={() => handleDelete(admin._id)}
                            className="hover:bg-red-500 bg-indigo-400 hover:scale-110 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                          >
                            <AiFillDelete />
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

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
            <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
              <p className="text-white text-center mb-4">
                Do you want to delete this admin?
              </p>

              <div className="flex justify-end mr-20">
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  onClick={handleConfirmDelete}
                >
                  <VscCheck />
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleCancelDelete}
                >
                  <VscClose />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateAdmin;
