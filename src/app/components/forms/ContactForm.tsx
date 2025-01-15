import React, { FC } from "react";

const ContactForm: FC = () => {
  return (
    <form className="font-serif font-semibold max-w-lg mx-auto bg-primary/20 shadow-md rounded p-8 mt-8 text-primary">
      <div className="mb-4">
        <label htmlFor="name" className="block text-white">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-2 p-2 border rounded w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-white">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-2 p-2 border rounded w-full"
          required
        />
      </div>

      <div className="mb-4 overflow-visible">
        <label htmlFor="request" className="block text-white">
          Request Type:
        </label>
        <select
          id="request"
          name="request"
          className="mt-2 p-2 border rounded w-full"
        >
          <option value="general">General Request</option>
          <option value="restaurant">Restaurant</option>
          <option value="office">Office</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-white">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          className="mt-2 p-2 border rounded w-full"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-green-700 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
