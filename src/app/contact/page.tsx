"use client";

import React, { FC } from "react";
import ContactForm from "../components/forms/ContactForm";

const ContactPage: FC = () => {
  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl text-primary font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-primary leading-relaxed text-center mb-8">
          Have any questions or inquiries? Feel free to get in touch with us by
          filling out the form below!
        </p>
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
