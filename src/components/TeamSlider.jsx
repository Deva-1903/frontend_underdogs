import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { FaInstagram, FaEnvelope, FaChevronLeft, FaChevronRight, FaPhone } from 'react-icons/fa';

const TeamSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/api/team-members');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= teamMembers.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {teamMembers.map((member) => (
            <div key={member._id} className="w-1/3 flex-shrink-0 px-4">
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-sm text-orange-500">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-orange-500">Experience:</span> {member.yearsOfExperience} years
                  </p>
                  {member.specialization && (
                    <p className="text-gray-300 mb-2">
                      <span className="font-semibold text-orange-500">Specialization:</span> {member.specialization}
                    </p>
                  )}
                  {member.certifications && member.certifications.length > 0 && (
                    <p className="text-gray-300 mb-2">
                      <span className="font-semibold text-orange-500">Certifications:</span> {member.certifications.join(', ')}
                    </p>
                  )}
                  <div className="flex justify-center space-x-4 mt-4">
                    {member.instaUrl && (
                      <a
                        href={member.instaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        <FaInstagram size={24} />
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                    >
                      <FaEnvelope size={24} />
                    </a>
                    {member.phoneNumber && (
                      <a
                        href={`tel:${member.phoneNumber}`}
                        className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        <FaPhone size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 shadow-md hover:bg-orange-600 transition-colors duration-300"
      >
        <FaChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 shadow-md hover:bg-orange-600 transition-colors duration-300"
      >
        <FaChevronRight className="text-2xl" />
      </button>
    </div>
  );
};

export default TeamSlider;