import React from "react";
import { FaEnvelope, FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-800 to-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
            <h4 className="text-3xl font-bold mb-4">Let's keep in touch!</h4>
            <p className="text-lg mb-4 text-gray-300">
              Find us on any of these platforms, we respond within 1-2 business days.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="mailto:underdogsfitnessclub@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-lg font-normal h-12 w-12 flex items-center justify-center align-center rounded-full outline-none focus:outline-none"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="https://www.instagram.com/underdogsfitness_/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-lg font-normal h-12 w-12 flex items-center justify-center align-center rounded-full outline-none focus:outline-none"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="tel:+919123525358"
                className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-lg font-normal h-12 w-12 flex items-center justify-center align-center rounded-full outline-none focus:outline-none"
              >
                <FaPhone size={20} />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-7/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                <span className="block uppercase text-orange-500 text-sm font-semibold mb-4">
                  Branch 1
                </span>
                <ul className="list-unstyled">
                  <li className="flex items-center mb-4">
                    <FaPhone className="mr-3 text-orange-500" />
                    <span className="hover:text-orange-500 transition-colors duration-300">
                      +91 91235 25358
                    </span>
                  </li>
                  <li className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-orange-500" />
                    <a
                      href="https://goo.gl/maps/zg8zYVShCY2ywrZS6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      No:1/186, Mariamman Kovil Street, Mugalivakkam, Chennai 600125
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <span className="block uppercase text-orange-500 text-sm font-semibold mb-4">
                  Branch 2
                </span>
                <ul className="list-unstyled">
                  <li className="flex items-center mb-4">
                    <FaPhone className="mr-3 text-orange-500" />
                    <span className="hover:text-orange-500 transition-colors duration-300">
                      +91 63822 32050
                    </span>
                  </li>
                  <li className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-orange-500" />
                    <a
                      href="https://goo.gl/maps/BRANCH2_MAP_LINK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      Branch 2 Address, City, State, Pincode
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-400 font-semibold py-1">
              Copyright © {new Date().getFullYear()} Underdogs Fitness Club
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;