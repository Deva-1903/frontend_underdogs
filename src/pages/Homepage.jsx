import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";
import ContactFormHeader from "../components/ContactFormHeader";
import ContactForm from "../components/ContactForm";
import Founders from "../components/Founders";
import { useParams, useNavigate } from 'react-router-dom';

function Homepage() {
  const { branch } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (branch !== 'branch1' && branch !== 'branch2') {
      navigate('/branch1');
    }
  }, [branch, navigate]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <Hero />
      <About />
      <Founders />
      <ContactFormHeader />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Homepage;
