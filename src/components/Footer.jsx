import React from "react";
import {
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-gray-300 pt-8 pb-6">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: 80, transform: "translateZ(0px)" }}
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
          <polygon
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">
              Follow us on social media
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6">
              <a
                href="mailto:underdogsfitnessclub@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <FaEnvelope className="flex text-orange-500" />
                </button>
              </a>

              <a
                href="https://www.instagram.com/underdogsfitness_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <FaInstagram className="flex text-orange-500" />
                </button>
              </a>
              <a href="tel:+919123525358">
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <FaPhone className="flex text-orange-500" />
                </button>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-lg mt-0 mb-2 text-gray-700">
                Contact or Whatsapp:
                <a href="tel:+919123525358" className="ml-2">
                  +91 91235 25358
                </a>
                <a href="tel:+916382232050" className="ml-2">
                  / 63822 32050
                </a>
              </p>
              <p className="text-lg mt-0 mb-2 text-gray-700">
                Address:
                <a
                  href="https://goo.gl/maps/zg8zYVShCY2ywrZS6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2"
                >
                  No:1/186, Mariamman Kovil Street, Mugalivakkam, Chennai 600125
                  <FaMapMarkerAlt className="inline ml-2 text-orange-500" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © Underdogs Fitnees Club
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
