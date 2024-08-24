import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { FaInstagram, FaEnvelope, FaChevronLeft, FaChevronRight, FaPhone } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Our Team</h2>
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="px-2">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
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
        </Slider>
      </div>
    </div>
  );
};

export default TeamSlider;