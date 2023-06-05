import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { publicContactForm, reset } from "../features/user/userSlice";
import Spinner from "../components/Spinner";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(`Form submitted successfully`);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      fullName: formData.name,
      email: formData.email,
      message: formData.message,
    };

    dispatch(publicContactForm(userData));

    setFormData("");
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
    <section className="relative block py-24 lg:pt-0 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"
              data-aos="fade-up-right"
            >
              <div className="flex-auto p-5 lg:p-10 bg-orange-500 text-white">
                <h4 className="text-2xl font-semibold">
                  Want to work with us?
                </h4>
                <p className="leading-relaxed mt-1 mb-4">
                  Complete this form and we will get back to you in 24 hours.
                </p>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 bg-white  text-black rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Full Name"
                    style={{ transition: "all 0.15s ease 0s" }}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 bg-white  text-black rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Email"
                    style={{ transition: "all 0.15s ease 0s" }}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="messaage"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    cols={80}
                    className="px-3 py-3 placeholder-gray-400 bg-white text-black rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Type a message..."
                    defaultValue={""}
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    onClick={handleSubmit}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
