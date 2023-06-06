import { useState, useEffect } from "react";
import { HiLockClosed } from "react-icons/hi";
import { GrInstagram } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

import { SiInstagram, SiGmail } from "react-icons/si";
import { IconContext } from "react-icons";

function Navbar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="container px-4 mx-auto flex items-center justify-between flex-wrap lg:flex-no-wrap">
        <a href="/" class="flex items-center">
          <div className="leading-relaxed inline-block mr-4 py-2">
            <img src={logo} alt="" className="img w-36 md:w-48 sm:w-40" />
          </div>
        </a>
        <IconContext.Provider
          value={{
            className: "text-2xl md:text-3xl leading-10 text-white opacity-75",
          }}
        >
          <ul className="flex flex-wrap list-none lg:flex-no-wrap">
            <li className="nav-item ">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="https://www.instagram.com/underdogsfitness_/"
              >
                <SiInstagram />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="mailto:underdogsfitnessclub@gmail.com"
              >
                <SiGmail />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                onClick={() => setShowLoginForm(true)}
              >
                <HiLockClosed />
              </a>
            </li>
          </ul>
        </IconContext.Provider>
      </div>
      {showLoginForm && (
        <div class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-50 flex items-center p-4 justify-center">
          <div class="bg-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
            <button
              class=" absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 focus:outline-none focus:shadow-outline  bg-gray-800 hover:bg-gray-600 "
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
            <h2 class="text-3xl font-bold mb-6 text-white text-center">
              Admin<span className="text-orange-500 ml-1">Login</span>
            </h2>

            <form onSubmit={handleSubmit}>
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
