import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  fetchUserDataForUpdate,
  updateFees,
  reset,
} from "../features/user/userSlice";
import Spinner from "../components/Spinner";
import axios from "../axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCurrencyRupee } from "react-icons/bs";

const UpdateSubscription = () => {
  const [formData, setFormData] = useState({
    subscription: "",
    subscription_type: "",
    mode_of_payment: "",
    cardio: "",
    paymentDate: "",
    feesAmount: "",
  });
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    subscription: "",
    subscription_type: "",
    status: "",
    planEnds: "",
  });
  const [options, setOptions] = useState([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [cardioOptions, setCardioOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const fetchSubscriptionOptions = async () => {
      try {
        // Fetch subscription options
        const optionsResponse = await axios.get(
          "/api/admin/subscription-options",
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
            },
          }
        );
        setOptions(optionsResponse.data);

        // Fetch subscription types
        const typesResponse = await axios.get("/api/admin/subscription-types", {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        setSubscriptionTypes(typesResponse.data);

        // Fetch subscription types
        const cardioTypesResponse = await axios.get("/api/admin/cardio-types", {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        setCardioOptions(cardioTypesResponse.data);

        // Fetch price options
        const priceTypesResponse = await axios.get("/api/admin/prices", {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        setPriceOptions(priceTypesResponse.data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptionOptions();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dispatch(fetchUserDataForUpdate(id));

      setFormData(response.payload);
      setUserData(response.payload);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(`User ${id} subscription updated successfully`);
    }

    if (!admin) {
      navigate("/login");
    }

    dispatch(reset());
  }, [admin, user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      subscription: formData.subscription,
      subscription_type: formData.subscription_type,
      cardio: formData.cardio,
      mode_of_payment: formData.mode_of_payment,
      paymentDate: formData.paymentDate,
      feesAmount: formData.feesAmount,
      adminName: admin.username,
    };

    const response = await dispatch(updateFees({ id, userData }));

    if (response.payload) {
      setUserData((prevData) => ({
        ...prevData,
        subscription: response.payload.subscription,
        subscription_type: response.payload.subscription_type,
        status: response.payload.status,
        planEnds: response.payload.planEnds,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    <div className="flex justify-center items-center ">
      <div className="container mx-auto p-4 mt-2">
        <div className="bg-gray-900 text-white p-4  rounded-md">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto shadow-md shadow-gray-700  p-4 rounded-md"
          >
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Update Subscription
              </h2>{" "}
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <p className="text-gray-300 font-semibold mb-2">User ID:</p>
                  <p className="text-gray-400">{userData.id}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <p className="text-gray-300 font-semibold mb-2">Name:</p>
                  <p className="text-gray-400">{userData.name}</p>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <p className="text-gray-300 font-semibold mb-2">
                    Subscription:
                  </p>
                  <p className="text-gray-400">{userData.subscription}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <p className="text-gray-300 font-semibold mb-2">
                    Subscription Type:
                  </p>
                  <p className="text-gray-400">{userData.subscription_type}</p>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <p className="text-gray-300 font-semibold mb-2">Status:</p>
                  <p className={`${userData.status === "active" ? "text-gray-400" : "text-red-500"}`}>{userData.status}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <p className="text-gray-300 font-semibold mb-2">Plan Ends:</p>
                  <p className="text-gray-400">
                    {formatDate(userData.planEnds)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="subscription"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Subscription
                </label>
                <select
                  id="subscription"
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  className="appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Please select --</option>
                  {options.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="subscriptionType"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Subscription Type
                </label>
                <select
                  id="subscription_type"
                  name="subscription_type"
                  value={formData.subscription_type}
                  onChange={handleChange}
                  className="appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Please select --</option>
                  {subscriptionTypes.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="cardio"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Cardio
                </label>
                <select
                  id="cardio"
                  name="cardio"
                  value={formData.cardio}
                  onChange={handleChange}
                  className="appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Please select --</option>
                  {cardioOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="subscriptionType"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Payment Mode
                </label>
                <select
                  id="mode_of_payment"
                  name="mode_of_payment"
                  value={formData.mode_of_payment}
                  onChange={handleChange}
                  className="appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Please select --</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-3 mt-6">
                <label
                  className="block text-gray-200 font-semibold mb-2"
                  htmlFor="payment-date"
                >
                  Payment Date
                </label>
                <DatePicker
                  className="appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  id="payment-date"
                  name="paymentDate"
                  selected={formData.paymentDate}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "paymentDate", value: date },
                    })
                  }
                  dateFormat="dd-MM-yyyy"
                  required
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mt-6">
                <label
                  className="block text-gray-200 text-sm font-bold mb-3"
                  htmlFor="fees-amount"
                >
                  Fees amount
                </label>
                <div className="flex justify-center items-center">
                  <BsCurrencyRupee className="rounded-s-md  py-1 px-2 text-4xl bg-slate-800 text-white" />
                  <select
                    className="appearance-none rounded-e-md  w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                    id="feesAmount"
                    name="feesAmount"
                    value={formData.feesAmount}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Please select --</option>
                    {priceOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5 items-center">
              <button
                className="bg-indigo-500 mb-3 hover:scale-110 duration-200 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
              <Link
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 mb-3 hover:scale-110 duration-200 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                to="/admin/update/subscription"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubscription;
