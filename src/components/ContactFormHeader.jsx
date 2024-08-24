import React from "react";

function ContactFormHeader() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl leading-relaxed">
              Reach out to us for any questions, membership inquiries, or to speak with our expert trainers. We're here to support your fitness journey every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormHeader;