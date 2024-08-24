import React from "react";
import Founder1 from "../assets/Founder1.jpg";
import Founder2 from "../assets/Founder2.jpg";
import TeamSlider from "./TeamSlider";
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
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-bold uppercase mb-4">Meet Our Founders & Trainers</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg leading-relaxed">
              Our founders are passionate about fitness and are dedicated to
              helping you achieve your fitness goals. With years of experience
              and expertise, they lead our team of professional trainers.
            </p>
          </div>
        </div>
        <TeamSlider />
      </div>
    </section>
  );
};

export default Founders;