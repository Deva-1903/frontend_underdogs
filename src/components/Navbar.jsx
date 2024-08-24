import { useState, useEffect } from "react";
import { HiLockClosed } from "react-icons/hi";
import { GrInstagram } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import logo from "../assets/UnderDogs.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useParams } from 'react-router-dom';

import { SiInstagram, SiGmail } from "react-icons/si";
import { IconContext } from "react-icons";
import {BsCalendarCheckFill} from "react-icons/bs";

function Navbar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [branch, setBranch] = useState('');

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    onChange(e);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branch: currentBranch } = useParams();


  const { admin, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || admin) {
      navigate("/admin/dashboard");
    }

    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      branch
    };

    dispatch(login(userData));
  };

  const EyeOpenToggle = () => {
    setEyeOpen(!eyeOpen);
  };

  function handleCloseLoginForm() {
    setShowLoginForm(false);
  }

  return (
    <nav className="relative flex  items-center justify-between px-2 py-3  bg-black">
      <div className="container px-4 mx-auto flex items-center justify-between lg:flex-no-wrap">
        <a href="/" class="flex items-center">
          <div className="leading-relaxed inline-block mr-4 py-2">
            <img src={logo} alt="" className="img w-20 md:w-24 sm:w-32" />
          </div>
        </a>
        <IconContext.Provider
          value={{
            className: "text-xl md:text-3xl leading-10 text-white opacity-75",
          }}
        >
          <ul className="flex flex-wrap list-none lg:flex-no-wrap">
            <li className="nav-item ">
              <a
                className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="https://www.instagram.com/underdogsfitness_/"
              >
                <SiInstagram />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="mailto:underdogsfitnessclub@gmail.com"
              >
                <SiGmail />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                onClick={() => setShowLoginForm(true)}
              >
                <HiLockClosed />
              </a>
            </li>
            <li className="nav-item">
              <Link to={`/attendance/${currentBranch}`}
                className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <BsCalendarCheckFill />
              </Link>
            </li>
          </ul>
        </IconContext.Provider>
      </div>
      {showLoginForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-50 flex items-center p-4 justify-center">
            <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 focus:outline-none focus:shadow-outline bg-gray-800 hover:bg-gray-600"
                onClick={handleCloseLoginForm}
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
              </button>
              <h2 className="text-3xl font-bold mb-6 text-white text-center">
                Admin<span className="text-orange-500 ml-1">Login</span>
              </h2>

              <form onSubmit={(e) => handleSubmit(e, branch)}>
                <div className="mb-8">
                  <label
                    className="block uppercase text-sm font-bold text-white"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div className="flex relative border-b-2 border-b-orange-500">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="w-full bg-transparent border-none outline-none -mb-2 pt-2 text-white"
                      required
                      onChange={onChange}
                      value={username}
                    />
                    <div className="text-orange-500 text-2xl mt-6">
                      <BsPersonFill />
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <label
                    className="block uppercase text-sm font-bold text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="flex relative border-b-2 border-b-orange-500">
                    <input
                      type={eyeOpen ? "text" : "password"}
                      name="password"
                      id="password"
                      className="w-full bg-transparent border-none outline-none -mb-2 pt-2 text-white"
                      required
                      value={password}
                      onChange={onChange}
                    />
                    <div
                      onClick={EyeOpenToggle}
                      className="cursor-pointer text-orange-500 text-2xl mt-6"
                    >
                      {eyeOpen ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block uppercase text-sm font-bold text-white" htmlFor="branch">
                    Branch
                  </label>
                  <div className="flex relative border-b-2 border-b-gray-300">
                    <select
                      name="branch"
                      id="branch"
                      className="w-full bg-gray-700 border-none outline-none -mb-2 pt-2 text-white appearance-none"
                      required
                      onChange={handleBranchChange}
                      value={branch}
                    >
                      <option value="" disabled>Select branch</option>
                      <option value="branch1">Branch 1</option>
                      <option value="branch2">Branch 2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-orange-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 border-transparent border-2 focus:border-orange-500 hover:scale-110 duration-200">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
      )}
    </nav>
  );
}

export default Navbar;
