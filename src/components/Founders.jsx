import React from "react";
import TeamSlider from "./TeamSlider";
const Founders = () => {
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