import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, reset } from "../features/user/userSlice";
import Spinner from "../components/Spinner";
import axios from "../axios";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCurrencyRupee } from "react-icons/bs";
import NewUserInvoice from "./pdf/NewUserInvoice";
import { pdf } from "@react-pdf/renderer";

function RegistrationForm() {
  const [formData, setFormData] = useState({
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
    mode_of_payment: "",
    cardio: "",
    joiningDate: "",
    photoURL: "",
    occupation: "",
    feesAmount: "",
    registrationFees: "",
    isPending: "",
    pendingAmount: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [options, setOptions] = useState([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [cardioOptions, setCardioOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [formValidation, setFormValidation] = useState({
    pendingAmount: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const fetchSubscriptionOptions = async () => {
      try {
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

        // Fetch cardio types
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
    if (isError) {
      toast.error(message);
    }

    if (!admin) {
      navigate("/login");
    }

    if (isSuccess) {
      toast.success(`User ${user.id} registered successfully`);
      setRegisteredUser(user);
      setIsRegistered(true);
      setFormData({
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
        mode_of_payment: "",
        cardio: "",
        photoURL: "",
        joiningDate: "",
        occupation: "",
        feesAmount: "",
        registrationFees: "",
        isPending: "",
        pendingAmount: "",
      });
      setSelectedPhoto(null);
    }

    dispatch(reset());
  }, [admin, user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      photoURL: formData.photoURL,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      mobile: formData.mobile,
      email: formData.email,
      healthIssues: formData.healthIssues,
      emergencyContactNo: formData.emergencyContactNo,
      height: formData.height,
      weight: formData.weight,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      subscription: formData.subscription,
      subscription_type: formData.subscription_type,
      mode_of_payment: formData.mode_of_payment,
      cardio: formData.cardio,
      joiningDate: formData.joiningDate,
      occupation: formData.occupation,
      feesAmount: formData.feesAmount,
      registrationFees: formData.registrationFees,
      isPending: formData.isPending,
      pendingAmount: formData.pendingAmount,
      adminName: admin.username,
    };

    dispatch(createUser(userData));
  };

  const generatePDF = async () => {
    const component = <NewUserInvoice user={registeredUser} />;
    const pdfBlob = await pdf(component).toBlob();
    return pdfBlob;
  };

  useEffect(() => {
    if (isRegistered) {
      const generateAndSendInvoice = async () => {
        try {
          const pdfData = await generatePDF();

          const formData = new FormData();
          formData.append("email", registeredUser.email);
          formData.append("attachment", pdfData, "invoice.pdf");
          formData.append("action", "register");
          formData.append("invoice_id", registeredUser.invoice_id);
          formData.append("user_name", registeredUser.name);

          const response = await axios.post(
            "/api/admin/send-invoice",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${admin.token}`,
              },
            }
          );

          // Check if the invoice was sent successfully
          if (response.data.message === "Invoice sent successfully!") {
            toast.success("Invoice sent successfully!");
          } else {
            toast.error("Invoice sent successfully!");
          }
        } catch (error) {
          console.error("Error generating or sending the invoice:", error);
        }
      };

      generateAndSendInvoice();
    }
  }, [isRegistered, registeredUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "isPending" && value === "yes") {
      setFormValidation((prevValidation) => ({
        ...prevValidation,
        pendingAmount: true,
      }));
    } else {
      setFormValidation((prevValidation) => ({
        ...prevValidation,
        pendingAmount: false,
      }));
    }
  };

  const uploadProfilePhoto = (file) => {
    const uuid = uuidv4();
    const fileRef = ref(storage, `images/${uuid}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 50000000;
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file.size > maxSize) {
      alert("The file size is too large.");
      return;
    }

    if (!allowedFileTypes.includes(file.type)) {
      alert("The file type is not supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedPhoto(reader.result);
    };
    reader.readAsDataURL(file);

    uploadProfilePhoto(file)
      .then((downloadURL) => {
        setFormData((prevData) => ({
          ...prevData,
          photoURL: downloadURL,
        }));
      })
      .catch((error) => {
        console.error("Error uploading profile photo:", error);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full mt-20">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full"
        >
          <p className="text-gray-200 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
            Registration Form
          </p>

          {/* Profile Photo field */}
          <div className="col-span-1 flex flex-col items-center pb-3">
            <div className="relative mb-4">
              {selectedPhoto && (
                <div className="mt-2 h-20 w-20 rounded-full mb-3 ml-8 bg-gray-200 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={selectedPhoto}
                    alt="Profile Preview"
                  />
                </div>
              )}
              <input
                className="hidden"
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="photo"
                className="bg-indigo-500 cursor-pointer hover:bg-indigo-400 hover:scale-110 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {selectedPhoto ? "Change Photo" : "Add Photo"}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <!-- Username field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="username"
              >
                Username
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* <!-- Age field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="age"
              >
                Age
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="30"
              />
            </div>

            {/* <!-- Gender field --> */}
            <div class="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                for="gender"
              >
                Gender
              </label>
              <select
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white  px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline appearance-none"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* <!-- Mobile field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="mobile"
              >
                Mobile
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                required
              />
            </div>

            {/* <!-- Email field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="email"
              >
                Email
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* <!-- Emergency Contact field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="emergency-contact"
              >
                Emergency Contact
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="tel"
                id="emergencyContactNo"
                name="emergencyContactNo"
                value={formData.emergencyContactNo}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>

            {/* <!-- Height field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="height"
              >
                Height
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="5'11''"
              />
            </div>

            {/* <!-- Weight field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="weight"
              >
                Weight
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="150 lbs"
              />
            </div>

            {/* <!-- Blood Group field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="blood-group"
              >
                Blood Group
              </label>
              <input
                className="border-transparent border-2 w-full focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="O+"
              />
            </div>

            {/* <!-- Health Issues field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="health-issues"
              >
                Health Issues
              </label>
              <input
                className="border-transparent border-2  focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
                id="healthIssues"
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                placeholder="Enter any health issues here"
              ></input>
            </div>

            {/* <!-- Address field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="address"
              >
                Address
              </label>
              <input
                className="border-transparent border-2  focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=""
              ></input>
            </div>

            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="occupation"
              >
                Occupation
              </label>
              <input
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter Occupation"
              ></input>
            </div>

            {/* <!-- Subscription field --> */}
            <div class="col-span-1 relative">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="subscription"
              >
                Subscription
              </label>
              <select
                className="appearance-none rounded w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
                id="subscription"
                name="subscription"
                value={formData.subscription}
                onChange={handleChange}
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

            {/* <!-- Subscription Type field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="subscription-type"
              >
                Subscription Type
              </label>
              <select
                className="appearance-none rounded w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
                 border-transparent border-2 focus:border-indigo-500"
                id="subscription_type"
                name="subscription_type"
                value={formData.subscription_type}
                onChange={handleChange}
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

            {/* cardio */}
            <div className="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                htmlFor="cardio"
              >
                Cardio
              </label>
              <select
                className="appearance-none rounded w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                id="cardio"
                name="cardio"
                value={formData.cardio}
                onChange={handleChange}
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

            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="mode_of_payment"
              >
                Mode of Payment
              </label>
              <select
                className="appearance-none rounded w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white 
    border-transparent border-2 focus:border-indigo-500"
                id="mode_of_payment"
                name="mode_of_payment"
                value={formData.mode_of_payment}
                onChange={handleChange}
                required
              >
                <option value="">-- Please select --</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <div className="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                htmlFor="registration-fees"
              >
                Registration Fee
              </label>
              <div className="flex justify-center items-center">
                <BsCurrencyRupee className="rounded-s-md  py-1 px-2 text-4xl bg-slate-800 text-white" />
                <input
                  type="number"
                  className="appearance-none rounded-e-md  w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  id="registrationFees"
                  name="registrationFees"
                  value={formData.registrationFees}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="col-span-1">
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

            {/* pending option */}
            <div className="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                htmlFor="fees-amount"
              >
                Pending?
              </label>
              <div className="flex justify-center items-center">
                <select
                  className="appearance-none rounded-e-md  w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  id="isPending"
                  name="isPending"
                  value={formData.isPending}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Please select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* pending amount */}
            <div className="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                htmlFor="fees-amount"
              >
                Pending Amount
              </label>
              <div className="flex justify-center items-center">
                <BsCurrencyRupee className="rounded-s-md  py-1 px-2 text-4xl bg-slate-800 text-white" />
                <input
                  className="appearance-none rounded-e-md  w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                  id="pendingAmount"
                  name="pendingAmount"
                  value={formData.pendingAmount}
                  onChange={handleChange}
                  required={formValidation.pendingAmount}
                />
              </div>
            </div>

            {/* Joining Date */}
            <div className="col-span-1">
              <label
                className="block text-gray-200 text-sm font-bold mb-3"
                htmlFor="joining-date"
              >
                Joining Date
              </label>
              <DatePicker
                className="appearance-none rounded w-full py-1.5 px-2.5 leading-tight focus:outline-none focus:shadow-outline bg-slate-800 text-white border-transparent border-2 focus:border-indigo-500"
                id="joining-date"
                name="joiningDate"
                selected={formData.joiningDate}
                onChange={(date) =>
                  handleChange({ target: { name: "joiningDate", value: date } })
                }
                dateFormat="dd-MM-yyyy"
                required
              />
            </div>
          </div>
          {/* <!-- Submit button --> */}
          <div className="flex justify-center items-center">
            <button
              className="bg-indigo-500 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
