import React from "react";
import Founder1 from "../assets/Founder1.jpg";
import Founder2 from "../assets/Founder2.jpg";
import { GoMailRead } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Founders = () => {
  const trainers = [
    {
      id: 1,
      src: Founder1,
      Name: "Karthik Krishnan",
      text: "Contact - 6382232050",
      instagram: "https://www.instagram.com/_karthikkrishnan_/",
      email: "mailto:karthikkalai1322@gmail.com",
    },
    {
      id: 2,
      src: Founder2,
      Name: "Bala Chandran",
      text: "Contact - 9123525358",
      instagram: "https://www.instagram.com/_balachandran__/",
      email: "mailto:balaashok13@gmail.com",
    },
  ];

  return (
    <section class="pt-20 pb-48">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center text-center mb-24">
          <div class="w-full lg:w-6/12 px-4">
            <h2 class="text-4xl font-semibold uppercase">Meet Our Founders</h2>
            <p class="text-lg leading-relaxed m-4">
              Our founders are passionate about fitness and are dedicated to
              helping you achieve your fitness goals.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap">
          {trainers.map((user) => (
            <div
              key={user.id}
              class="w-full md:w-6/12 lg:mb-0 mb-12 px-4"
              data-aos="flip-right"
            >
              <div class="px-6">
                <img
                  alt="..."
                  src={user.src}
                  class="shadow-lg rounded max-w-full mx-auto"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">{user.Name}</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {user.text}
                  </p>
                  <div className="flex justify-center items-center mt-4 gap-4 text-3xl cursor-pointer scale-105 duration-200">
                    <a
                      className="hover:bg-red-700 hover:text-white rounded-md"
                      href={user.instagram}
                    >
                      <FaInstagramSquare />
                    </a>
                    <a className="hover:bg-white hover:text-blue-500" href="">
                      <FaTwitterSquare />
                    </a>

                    <a className="hover:text-indigo-600" href={user.email}>
                      <GoMailRead />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
