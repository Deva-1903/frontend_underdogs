import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";

function ManageContent() {
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [cardioTypes, setCardioTypes] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [activeTab, setActiveTab] = useState("subscriptionOptions");
  const [newOptionName, setNewOptionName] = useState("");
  const [newTypeName, setNewTypeName] = useState("");
  const [newCardioName, setNewCardioName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [brochureImage, setBrochureImage] = useState(null);
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async (url, stateSetter) => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        stateSetter(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };
    fetchData("/api/admin/subscription-options", setSubscriptionOptions);
    fetchData("/api/admin/subscription-types", setSubscriptionTypes);
    fetchData("/api/admin/cardio-types", setCardioTypes);
    fetchData("/api/admin/brochure", setBrochureImage);
    fetchData("/api/admin/prices", setPriceOptions);
  }, [admin.token]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddSubscriptionOption = async () => {
    try {
      if (newOptionName === "") {
        toast.error("Please enter a subscription option name");
        return;
      }
      const response = await axios.post(
        "/api/admin/subscription-options",
        { name: newOptionName },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const newItem = response.data;
      setSubscriptionOptions((prevOptions) => [...prevOptions, newItem]);
      setNewOptionName("");
      toast.success("Subscription option added successfully");
    } catch (error) {
      console.error("Error adding subscription option:", error);
      toast.error("Failed to add subscription option");
    }
  };

  const handleDeleteSubscriptionOption = async (optionId) => {
    try {
      await axios.delete(`/api/admin/subscription-options/${optionId}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setSubscriptionOptions((prevOptions) =>
        prevOptions.filter((option) => option._id !== optionId)
      );
      toast.success("Subscription option deleted successfully");
    } catch (error) {
      console.error("Error deleting subscription option:", error);
      toast.error("Failed to delete subscription option");
    }
  };

  const handleAddSubscriptionType = async () => {
    try {
      if (newTypeName === "") {
        toast.error("Please enter a subscription type name");
        return;
      }
      const response = await axios.post(
        "/api/admin/subscription-types",
        { name: newTypeName },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const newItem = response.data;
      setSubscriptionTypes((prevTypes) => [...prevTypes, newItem]);
      setNewTypeName("");
      toast.success("Subscription type added successfully");
    } catch (error) {
      console.error("Error adding subscription type:", error);
      toast.error("Failed to add subscription type");
    }
  };
  const handleDeleteSubscriptionType = async (typeId) => {
    try {
      await axios.delete(`/api/admin/subscription-types/${typeId}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setSubscriptionTypes((prevTypes) =>
        prevTypes.filter((type) => type._id !== typeId)
      );
      toast.success("Subscription type deleted successfully");
    } catch (error) {
      console.error("Error deleting subscription type:", error);
      toast.error("Failed to delete subscription type");
    }
  };

  const handleAddCardioType = async () => {
    try {
      if (newCardioName === "") {
        toast.error("Please enter a cardio type name");
        return;
      }
      const response = await axios.post(
        "/api/admin/cardio-types",
        { name: newCardioName },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const newItem = response.data;
      setCardioTypes((prevTypes) => [...prevTypes, newItem]);
      setNewCardioName("");
      toast.success("Cardio type added successfully");
    } catch (error) {
      console.error("Error adding cardio type:", error);
      toast.error("Failed to add cardio type");
    }
  };
  const handleDeleteCardioType = async (typeId) => {
    try {
      await axios.delete(`/api/admin/cardio-types/${typeId}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setCardioTypes((prevTypes) =>
        prevTypes.filter((type) => type._id !== typeId)
      );
      toast.success("Cardio type deleted successfully");
    } catch (error) {
      console.error("Error deleting cardio type:", error);
      toast.error("Failed to delete cardio type");
    }
  };

  const handleAddPriceOption = async () => {
    try {
      if (newPrice === "") {
        toast.error("Please enter a valid price");
        return;
      }
      const response = await axios.post(
        "/api/admin/prices",
        { price: newPrice },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const newItem = response.data;
      console.log(newItem);
      setPriceOptions((prevOptions) => [...prevOptions, newItem]);
      setNewPrice("");
      toast.success("Price added successfully");
    } catch (error) {
      console.error("Error adding price:", error);
      toast.error("Failed to add price");
    }
  };

  const handleDeletePriceOption = async (optionId) => {
    try {
      await axios.delete(`/api/admin/prices/${optionId}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setPriceOptions((prevOptions) =>
        prevOptions.filter((option) => option._id !== optionId)
      );
      toast.success("Price deleted successfully");
    } catch (error) {
      console.error("Error deleting price:", error);
      toast.error("Failed to delete price");
    }
  };

  const uploadProfilePhoto = (file) => {
    const uuid = uuidv4();
    const storageRef = ref(storage, `brochure/${uuid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };
  const handleUpdateBrochure = () => {
    if (!selectedPhoto) {
      alert("Please select an image to update the brochure.");
      return;
    }
    uploadProfilePhoto(selectedPhoto)
      .then((downloadURL) => {
        const apiUrl = "/api/admin/brochure";
        const token = admin.token;
        const brochureId = brochureImage[0]._id;
        // Check admin username
        if (admin.username !== "bala" && admin.username !== "karthik") {
          toast.error("You don't have access to update the brochure.");
          return;
        }
        axios
          .put(
            `${apiUrl}/${brochureId}`,
            { photoURL: downloadURL },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log("Image updated and API request sent successfully");
            toast.success("Brochure updated successfully");
            setBrochureImage([{ _id: brochureId, photoURL: downloadURL }]);
            setSelectedPhoto(null);
          })
          .catch((error) => {
            console.error("Error sending API request:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading profile photo:", error);
      });
  };
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-page bg-gradient-to-b  mt-24 p-10">
      <div className="flex justify-center items-center mb-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-0">
          <button
            onClick={() => handleTabChange("subscriptionOptions")}
            className={`text-gray-500 font-semibold py-2 px-4 border-b-2 border-transparent hover:text-gray-700  hover:border-indigo-500 focus:border-orange-500 ${
              activeTab === "subscriptionOptions"
                ? " text-white text-lg"
                : " text-gray-200"
            }`}
          >
            Subscription Options
          </button>

          <button
            onClick={() => handleTabChange("subscriptionTypes")}
            className={`text-gray-500 font-semibold py-2 px-4 border-b-2 border-transparent hover:text-gray-700  hover:border-indigo-500 focus:border-orange-500 ${
              activeTab === "subscriptionTypes"
                ? " text-white text-lg"
                : " text-gray-200"
            }`}
          >
            Subscription Types
          </button>

          <button
            onClick={() => handleTabChange("cardioTypes")}
            className={`text-gray-500 font-semibold py-2 px-4 border-b-2 border-transparent hover:text-gray-700  hover:border-indigo-500 focus:border-orange-500 ${
              activeTab === "cardioTypes"
                ? " text-white text-lg"
                : " text-gray-200"
            }`}
          >
            Cardio Types
          </button>

          <button
            onClick={() => handleTabChange("feesOptions")}
            className={`text-gray-500 font-semibold py-2 px-4 border-b-2 border-transparent hover:text-gray-700  hover:border-indigo-500 focus:border-orange-500 ${
              activeTab === "feesOptions"
                ? " text-white text-lg"
                : " text-gray-200"
            }`}
          >
            Fees
          </button>

          <button
            onClick={() => handleTabChange("brochure")}
            className={`text-gray-500 font-semibold py-2 px-4 border-b-2 border-transparent hover:text-gray-700 hover:border-indigo-500 focus:border-orange-500 ${
              activeTab === "brochure"
                ? " text-white text-lg"
                : " text-gray-200"
            }`}
          >
            Brochure
          </button>
        </div>
      </div>

      {activeTab === "subscriptionOptions" && (
        <div className="mt-8">
          {subscriptionOptions.map((option) => (
            <div key={option._id} className="flex items-center mt-4 mb-2">
              <span className="text-white text-xl flex-grow mb-2">
                {option.name}
              </span>
              <button
                onClick={() => handleDeleteSubscriptionOption(option._id)}
                className="bg-red-500 hover:bg-red-400 text-lg text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
          {/* Add Subscription Option */}
          <div className="flex items-center mt-2">
            <input
              type="number"
              name="newOptionName"
              placeholder="Enter number of months"
              className="appearance-none rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 bg-slate-800 text-white border-gray-200 border-transparent border-2 "
              value={newOptionName}
              onChange={(e) => handleChange(e, setNewOptionName)}
              min="1"
            />
            <button
              onClick={handleAddSubscriptionOption}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline ml-2 hover:scale-110 duration-150"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "subscriptionTypes" && (
        <div className="mt-8">
          {subscriptionTypes.map((type) => (
            <div key={type._id} className="flex items-center mt-4 mb-2">
              <span className="text-white text-xl flex-grow mb-2">
                {type.name}
              </span>
              <button
                onClick={() => handleDeleteSubscriptionType(type._id)}
                className="bg-red-500 hover:bg-red-400 text-lg text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
          {/* Add Subscription Type */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="newTypeName"
              placeholder="Add Subscription Type"
              className="appearance-none rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 bg-slate-800 text-white border-gray-200 border-transparent border-2 "
              value={newTypeName}
              onChange={(e) => handleChange(e, setNewTypeName)}
            />
            <button
              onClick={handleAddSubscriptionType}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline ml-2 hover:scale-110 duration-150"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "cardioTypes" && (
        <div className="mt-8">
          {cardioTypes.map((type) => (
            <div key={type._id} className="flex items-center mt-4 mb-2">
              <span className="text-white text-xl flex-grow mb-2">
                {type.name}
              </span>
              <button
                onClick={() => handleDeleteCardioType(type._id)}
                className="bg-red-500 hover:bg-red-400 text-lg text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
          {/* Add Cardio Type */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              name="newCardioName"
              placeholder="Add Cardio Type"
              className="appearance-none rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 bg-slate-800 text-white border-gray-200 border-transparent border-2 "
              value={newCardioName}
              onChange={(e) => handleChange(e, setNewCardioName)}
            />
            <button
              onClick={handleAddCardioType}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline ml-2 hover:scale-110 duration-150"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "feesOptions" && (
        <div className="mt-8">
          {priceOptions.map((option) => (
            <div key={option._id} className="flex items-center mt-4 mb-2">
              <span className="text-white text-xl flex-grow mb-2">
                ₹ {option.price}
              </span>
              <button
                onClick={() => handleDeletePriceOption(option._id)}
                className="bg-red-500 hover:bg-red-400 text-lg text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
          <div className="flex items-center mt-2">
            <input
              type="number"
              name="newPrice"
              placeholder="Enter the price"
              className="appearance-none rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 bg-slate-800 text-white border-gray-200 border-transparent border-2 "
              value={newPrice}
              onChange={(e) => handleChange(e, setNewPrice)}
              min="1"
            />
            <button
              onClick={handleAddPriceOption}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline ml-2 hover:scale-110 duration-150"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "brochure" && (
        <div className="mt-4 flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
            <div className="md:col-span-2">
              <div className="flex flex-col items-center">
                <h3 className="text-white mt-4">Brochure Image:</h3>
                <div className="flex">
                  {brochureImage && brochureImage.length > 0 ? (
                    <img
                      src={brochureImage[0].photoURL}
                      alt="Brochure preview"
                      className="mt-2 max-w-xs md:max-w-md"
                      style={{ margin: "auto" }}
                    />
                  ) : (
                    <p className="text-white">No image available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center">
            <div className="md:flex justify-center items-center">
              <input
                type="file"
                className="mb-2 text-white"
                onChange={(event) => setSelectedPhoto(event.target.files[0])}
              />
              <button
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-1 px-2 md:w-6/12 rounded focus:outline-none focus:shadow-outline hover:scale-110 duration-200"
                onClick={handleUpdateBrochure}
              >
                Update Brochure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageContent;
