import React from "react";
import { FaDumbbell, FaHardHat, FaUsers } from "react-icons/fa";
import Founders from "../assets/Founders.JPG";

function About() {
  return (
    <section id="about" className="relative py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="items-center flex flex-wrap">
          <div
            className="w-full md:w-5/12 ml-auto mr-auto px-4"
            data-aos="fade-right"
          >
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src={Founders}
            />
          </div>
          <div
            className="w-full md:w-5/12 ml-auto mr-auto px-4"
            data-aos="fade-left"
          >
            <div className="md:pr-12">
              <small className="text-orange-500">About our gym</small>
              <h3 className="text-4xl uppercase font-bold">
                Safe Body Building
              </h3>
              <p className="mt-4 text-lg leading-relaxed">
                Our gym encourages your fitness goals. Top-notch equipment,
                expert trainers, and a variety of classes and programmes will
                help you achieve your best. Why wait? Train with us!
              </p>
              <ul className="list-none mt-6">
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="font-semibold inline-block py-3 mr-3 text-orange-500">
                        <FaDumbbell size={32} />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl">
                        The latest &amp; greatest gym equipment
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="font-semibold inline-block py-3 mr-3 text-orange-500">
                        <FaHardHat size={32} />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl">
                        5-inch, quality foam floor padding
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="font-semibold inline-block py-3 mr-3 text-orange-500">
                        <FaUsers size={32} />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl">3 professional trainers</h4>
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
