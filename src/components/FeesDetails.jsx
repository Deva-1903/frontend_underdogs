import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/UnderDogs_logo.png";
import { FiDownload } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import NewUserInvoice from "./pdf/NewUserInvoice";
import UpdateSubInvoice from "./pdf/UpdateSubInvoice";
import { pdf } from "@react-pdf/renderer";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from "react-router-dom";

function FeesDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [adminNames, setAdminNames] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const tableRef = useRef(null);

  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAdminNames = async () => {
      try {
        const response = await axios.get("/api/admin/admin-names", {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        setAdminNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminNames();
  }, []);

  useEffect(() => {
    const fetchFeesDetails = async () => {
      try {
        setIsLoading(true);

        const params = {
          startDate: startDate,
          endDate: endDate,
          admin: selectedAdmin,
          page: currentPage,
        };

        if (admin.username !== "bala" && admin.username !== "karthik") {
          params.admin = admin.username;
        }

        const apiUrl = "/api/admin/fees-details";
        const response = await axios.get(apiUrl, {
          params,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        const data = response.data;

        setUsers(data);
      } catch (error) {
        console.error("Error fetching fees details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeesDetails();
  }, [dispatch, startDate, endDate, selectedAdmin, currentPage]);

  const handlePageForward = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageBackward = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAdminFilterChange = (event) => {
    setSelectedAdmin(event.target.value);

    setCurrentPage(1);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("landscape", "px", "a4", "portrait");
    const table = tableRef.current;

    const logoImage = new Image();
    logoImage.src = logo;

    logoImage.onload = function () {
      const logoWidth = 150; // Adjust the desired width of the logo
      const logoHeight = (logoWidth * logoImage.height) / logoImage.width;

      const pageWidth = doc.internal.pageSize.getWidth();
      const x = (pageWidth - logoWidth) / 2;
      const y = 10; // Adjust the desired vertical position from the top

      doc.addImage(logoImage, "JPEG", x, y, logoWidth, logoHeight);

      // Add start date and end date with bigger font size and styling
      const startDateStr = startDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const endDateStr = endDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      doc.setFont("helvetica", "bold"); // Set font style to bold
      doc.setFontSize(16); // Increase the font size for start date, end date, and fees details
      doc.setTextColor("#333"); // Set text color to dark gray
      doc.text(`Start Date: ${startDateStr}`, 20, y + logoHeight + 20);
      doc.setTextColor("#333"); // Set text color to dark gray
      doc.text(`End Date: ${endDateStr}`, pageWidth - 20, y + logoHeight + 20, {
        align: "right",
      });

      // Calculate the x-coordinate for centering the "Fees Details" text
      const feesDetailsText = "Fees Details";
      const feesDetailsTextWidth =
        (doc.getStringUnitWidth(feesDetailsText) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const feesDetailsX = (pageWidth - feesDetailsTextWidth) / 2;

      // Add table with centered "Fees Details" text and styling
      doc.setFont("helvetica", "bold"); // Set font style to bold
      doc.setFontSize(14); // Increase the font size for the "Fees Details" heading
      doc.setTextColor("#333"); // Set text color to dark gray
      doc.text(feesDetailsText, feesDetailsX, y + logoHeight + 40);

      // Set the current page number
      doc.setFontSize(10); // Set font size for the page number
      doc.text(
        `Page ${currentPage}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        {
          align: "center",
        }
      );

      doc.autoTable({
        html: table,
        startY: y + logoHeight + 50,
        orientation: "landscape",
      });
      doc.save("fees_details.pdf");
    };
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      <h1 className="text-white text-center text-3xl font-bold py-6">
        Fees Details{" "}
        <span className="text-white cursor-pointer" onClick={handleDownloadPDF}>
          <FiDownload className="inline-block align-middle text-2xl mb-1 ml-3 hover:text-orange-600 hover:scale-110 duration-200" />{" "}
        </span>
      </h1>
      <div className="flex justify-center md:justify-end items-center md:mr-12 md:-mt-10 mb-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          className="px-2 py-1 border rounded-md w-52 md:w-48 focus:outline-none focus:ring focus:border-indigo-500 bg-slate-900 text-white"
        />
       <FiSearch className="absolute w-6 h-6 right-3 top-1.5 cursor-pointer text-white" onClick={()=>setShowDetails(true)} />
      </div>
    </div>
      <div className="flex justify-center items-center">
        <div className="items-center justify-center w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 ">
          <div className="flex justify-center items-center gap-3 mb-6 ml-20 ">
            <label className="text-gray-500 uppercase font-bold text-sm mr-4">
              Start Date:
            </label>
            <DatePicker
              className="border-transparent border-2 focus:border-indigo-500 w-8/12  bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline -ml-7"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div className="flex justify-center items-center gap-6 mb-6 ml-20">
            <label className="text-gray-500 uppercase font-bold text-sm mr-4">
              End Date:
            </label>
            <DatePicker
              className="border-transparent border-2 focus:border-indigo-500 w-8/12  bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline -ml-6"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div className="flex justify-center items-center gap-6 mb-6 lg:ml-20 ">
            <label className="text-gray-500 uppercase font-bold text-sm mr-4">
              Admin Filter:
            </label>
            <select
              className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
              value={selectedAdmin}
              onChange={handleAdminFilterChange}
            >
              <option value="">All</option>
              {adminNames.map((adminName) => (
                <option key={adminName} value={adminName}>
                  {adminName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center gap-6 mb-6 lg:ml-20 ">
            <Link to={"/admin/fee-details/pending-fees"}>
              <button className="text-white bg-slate-800 px-3 py-2 rounded-xl text-sm border border-gray-200 hover:scale-110 duration-200">
                Pending Detail
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <div className="overflow-x-auto p-4">
          <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-16">
                <p className="text-white text-lg font-bold">Loading...</p>
              </div>
            ) : (
              <table
                className="w-full divide-y divide-x divide-gray-200 border"
                ref={tableRef}
              >
                <thead>
                  <tr>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Subscription Type
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Cardio
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Pay Method
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Payment Date
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 border bg-slate-800 text-center text-xs md:text-base font-medium text-white uppercase tracking-wider">
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border">
                  {users.map((user) => (
                    <tr key={user.user_id} className="border">
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.user_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.subscription}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-center text-gray-100 border">
                        {user.subscription_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {user.cardio}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {user.mode_of_payment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {user.admin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        ₹{user.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {user.transaction_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {new Date(user.createdAt)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, "-")}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        {new Date(user.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center md:text-base text-gray-100 border">
                        ₹{user.pending_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <div className="flex items-center">
          <button
            className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 mr-2"
            onClick={handlePageBackward}
          >
            <IoChevronForwardCircleSharp className="rotate-180" />
          </button>
          <span className="text-white uppercase font-bold text-sm mr-1 ml-1">
            {currentPage}
          </span>
          <button
            className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 ml-2"
            onClick={handlePageForward}
          >
            <IoChevronForwardCircleSharp />
          </button>
        </div>
      </div>
      {
        showDetails && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-50 flex items-center p-4 justify-center">
          <div className="bg-slate-800 rounded-lg shadow-lg p-10">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={() => setShowDetails(false)}
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
            <div className="flex justify-center items-center mb-4 p-4 px-12">
              <h2 className="text-2xl md:text-3xl text-white font-bold ">
                <span className="text-orange-500">{`${searchValue}'s`}</span> Details
              </h2>
            </div>

            <form className="space-y-6 p-8 px-16 ">
              <div className="flex justify-center flex-col mb-6 gap-10">
                <h1
                  className="text-white font-bold text-2xl mb-2"
                >
                 Paid Fees : ₹ 7000
                </h1>
                <h1
                  className="text-white font-bold text-2xl mb-2"
                >
                 Pending Fees : <span className="text-red-600">₹ 500</span>
                </h1>
             
              </div>
            </form>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default FeesDetails;
