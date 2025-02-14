"use client"
import Header from "@/components/header";
import { useState } from "react";
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BookingPeriod = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    console.log("Selected Date Range: ", ranges.selection);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission logic here
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Select Booking Period</h2>
        <div className="flex justify-center mt-5">
          <DateRange
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            First Name (required):
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block">
            Last Name (required):
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block">
            Email (required):
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block">
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingPeriod;
