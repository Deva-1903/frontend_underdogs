import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";
import ContactFormHeader from "../components/ContactFormHeader";
import ContactForm from "../components/ContactForm";
import Founders from "../components/Founders";

function Homepage() {
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
