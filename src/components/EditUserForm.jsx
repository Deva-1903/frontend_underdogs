import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  fetchUserDataForUpdate,
  updateUser,
  reset,
} from "../features/user/userSlice";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function EditUserForm() {
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
    photoURL: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const { admin } = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dispatch(fetchUserDataForUpdate(id));
      setFormData(response.payload);
      setSelectedPhoto(response.payload.photoURL);
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

  const handleCancel = () => {
    navigate("/admin/register/user");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
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
      photoURL: formData.photoURL,
    };

    dispatch(updateUser({ id, userData }));
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

  return (
    <div class="flex flex-col justify-center items-center h-full mt-12">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          class="bg-slate-900 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 
       max-h-full"
        >
          <p className="text-gray-200 font-bold text-xl md:text-3xl mb-6 mt-4  lg:mt-0 flex justify-center">
            Edit Form
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Profile Photo field */}
            <div className="col-span-1 flex flex-col items-center">
              <label
                className="block text-gray-200 text-sm font-bold mb-4"
                htmlFor="photo"
              >
                Profile Photo
              </label>
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
                  className="bg-indigo-500 cursor-pointer hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 duration-200"
                >
                  {selectedPhoto ? " Change Photo" : "Add Photo"}
                </label>
              </div>
            </div>

            {/* <!-- Username field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="username"
              >
                Username
              </label>
              <input
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="5'11''"
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
              <textarea
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
                id="healthIssues"
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                placeholder="Enter any health issues here"
              ></textarea>
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
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
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="O+"
              />
            </div>

            {/* <!-- Address field --> */}
            <div class="col-span-1">
              <label
                class="block text-gray-200 text-sm font-bold mb-3"
                for="address"
              >
                Address
              </label>
              <textarea
                className="border-transparent border-2 focus:border-indigo-500 bg-slate-800 text-white border-gray-200 px-2 py-1 w-full rounded-lg focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=""
              ></textarea>
            </div>
          </div>
          {/* <!-- Submit button --> */}
          <div className="flex justify-center gap-5 items-center">
            <button
              className="bg-indigo-500 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
            <button
             className="bg-gray-300 hover:bg-gray-400 text-gray-800 mt-8 mb-3 hover:scale-110 duration-200 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
             <Link
             to="/admin/update/user">
              Cancel
             </Link>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
