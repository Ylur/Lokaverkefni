
"use client";

import React from "react";

interface BookingFormProps {
  email: string;
  date: string;
  time: string;
  people: number;
  today: string; // used for min date, no time travellers
  timeSlots: string[];
  onChangeEmail: (val: string) => void;
  onChangeDate: (val: string) => void;
  onChangeTime: (val: string) => void;
  onChangePeople: (val: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  email,
  date,
  time,
  people,
  today,
  timeSlots,
  onChangeEmail,
  onChangeDate,
  onChangeTime,
  onChangePeople,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const validateForm: React.FormEventHandler = (e) => {
    const isValid = formRef.current?.checkValidity();
  };

  return (
    <form onSubmit={validateForm}>
      <div className="bg-black/40 p-4 rounded shadow space-y-4">
        {/* Email */}
        <div>
          <label className="block font-semibold ">Email:</label>
          <input
            type="email"
            className="border w-full text-primary p-1"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
          />
        </div>
        {/* Date */}
        <div>
          <label className="block font-semibold">Date:</label>
          <input
            type="date"
            className="border w-full text-primary p-1"
            min={today}
            value={date}
            onChange={(e) => onChangeDate(e.target.value)}
          />
        </div>
        {/* Time (Half-Hour Slots) */}
        <div>
          <label className="block font-semibold">Time (16:00-23:00):</label>
          <select
            className="border w-full text-primary p-1"
            value={time}
            onChange={(e) => onChangeTime(e.target.value)}
          >
            <option value="">Select a Time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* People */}
        <div>
          <label className="block font-semibold">People (1-10):</label>
          <input
            type="number"
            className="border w-full text-primary p-1"
            min={1}
            max={10}
            value={people}
            onChange={(e) => onChangePeople(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="border rounded p-2 bg-primary hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
