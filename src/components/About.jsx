import React from "react";
import { FaDumbbell, FaHardHat, FaUsers } from "react-icons/fa";
import Founders from "../assets/Founders.JPG";

function About() {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mb-8 md:mb-0" data-aos="fade-right">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
              <img
                alt="Founders"
                src={Founders}
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-8 mb-4">
                <h4 className="text-xl font-bold text-gray-800">
                  Safe Body Building
                </h4>
                <p className="text-md font-light mt-2 text-gray-600">
                  Our gym encourages your fitness goals. Top-notch equipment, expert trainers, and a variety of classes and programmes will help you achieve your best. Why wait? Train with us!
                </p>
              </blockquote>
            </div>
          </div>

          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto" data-aos="fade-left">
            <div className="md:pr-12">
              <h3 className="text-3xl font-semibold mb-2">About our gym</h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                At Underdogs FitnessClub, we're committed to helping you achieve your fitness goals in a safe and motivating environment.
              </p>
              <ul className="list-none mt-6">
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="text-orange-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-orange-100">
                      <FaDumbbell size={24} />
                    </div>
                    <div className="flex-1 ml-4">
                      <h5 className="text-xl font-semibold mb-1">Latest Equipment</h5>
                      <p className="text-gray-600">State-of-the-art machines for optimal workouts</p>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="text-orange-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-orange-100">
                      <FaHardHat size={24} />
                    </div>
                    <div className="flex-1 ml-4">
                      <h5 className="text-xl font-semibold mb-1">Safety First</h5>
                      <p className="text-gray-600">5-inch, quality foam floor padding for your protection</p>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="text-orange-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-orange-100">
                      <FaUsers size={24} />
                    </div>
                    <div className="flex-1 ml-4">
                      <h5 className="text-xl font-semibold mb-1">Expert Trainers</h5>
                      <p className="text-gray-600">3 professional trainers to guide your fitness journey</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;