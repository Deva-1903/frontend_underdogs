import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../axios";

import { useNavigate } from "react-router-dom";
import { FaTags } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { encryptData } from '../utils/utils';


function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { branch } = useParams();


  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (branch !== 'branch1' && branch !== 'branch2') {
      toast.error("Invalid branch selected. Please choose a valid branch");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/attendance", { id: userId, branch });
      if (response.status === 200) {
        toast.success("Attendance added successfully");
        setShowForm(false);
        setUserId("");
        const encryptedBranch = encryptData(branch);
        const encryptedUserId = encryptData(userId.toString());

        // Encode encrypted data for URL
        const encodedUserId = encodeURIComponent(encryptedUserId);
        const encodedBranch = encodeURIComponent(encryptedBranch);
        navigate(`/data/${encodedBranch}/${encodedUserId}`);
      } else if (response.status === 204) {
        toast.error(response.data.message);
      } else {
        toast.error("Failed to add attendance");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("User does not exist");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  function handleDownload(event) {
    event.preventDefault();
    if (branch !== 'branch1' && branch !== 'branch2') {
      toast.error("Invalid branch selected. Please choose a valid branch.");
      return;
    }

    axios
      .get(`/api/brochure?branch=${branch}`)
      .then((response) => {
        const data = response.data;
        if (data.length === 0) {
          toast.error("No brochure available for the selected branch.");
          return;
        }
        const brochureURL = data[0].photoURL;
        const link = document.createElement("a");
        link.href = brochureURL;
        link.download = "brochure.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading brochure:", error);
        toast.error("Error downloading brochure. Please try again later.");
      });
  }

  function handleClose() {
    setShowForm(false);
  }

  return (
    <div>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "95vh" }}
      >
        <div
          className="absolute top-0 w-full h-full bg-top bg-cover"
          style={{
            backgroundImage:
              'url("https://t4.ftcdn.net/jpg/03/50/81/89/360_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg")',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          />
        </div>
        <div className="container relative mx-auto" data-aos="fade-in">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div>
                <h1 className="animated-text text-white font-semibold text-2xl lg:text-5xl">
                  Underdogs FitnessClub
                </h1>
                <p className="mt-4 text-base lg:text-lg text-gray-300">
                  Unleash your potential at Underdogs Fitness Club. Experience
                  the power of our training center today by downloading our
                  complete offers.
                </p>
                <div className="flex justify-center mt-5">
                  <button
                    onClick={handleDownload}
                    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white p-4 border border-orange-500 hover:border-transparent rounded inline-block cursor-pointer mr-4"
                  >
                    <div className="flex gap-3">
                      <FaTags className=" mt-1 text-2xl" />
                      <p className="text-xl lg:pr-2">Offers</p>
                    </div>
                  </button>
                  <button
                    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white p-4 border border-orange-500 hover:border-transparent rounded inline-block cursor-pointer"
                    onClick={() => setShowForm(true)}
                  >
                    <p className="lg:text-xl text-lg">Add Attendance</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: 70, transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x={0}
            y={0}
          >
            <polygon points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-50 flex items-center p-4 justify-center">
          <div className="bg-gray-700 rounded-lg shadow-lg p-10">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={handleClose}
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
            <div className="flex items-center mb-8">
              <h2 className="text-2xl md:text-3xl text-white font-bold">
                <span className="text-orange-500">Attendance</span> Register
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="id"
                  className="text-white font-bold text-lg mb-2"
                >
                  Enter your user ID
                </label>
                <div className="flex relative  border-b-2 border-b-orange-500">
                  <input
                    type="number"
                    name="id"
                    id="id"
                    value={userId}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none pb-2 pt-2 text-white mt-4"
                    min="0"
                    required
                    placeholder="e.g. 1101"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {isLoading ? (
                  <div className="text-white font-bold py-2 px-4 rounded bg-gray-600">
                    Loading...
                  </div>
                ) : (
                  <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
