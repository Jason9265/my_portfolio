"use client"
import Header from "@/components/header";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");

  const timeSlots = [
    "8:00 am - 8:30 am",
    "8:30 am - 9:00 am",
    "9:00 am - 9:30 am",
    "9:30 am - 10:00 am",
    "10:00 am - 10:30 am",
    "10:30 am - 11:00 am",
    "11:00 am - 11:30 am",
    "11:30 am - 11:59 am",
    "12:00 pm - 12:30 pm",
    "12:30 pm - 1:00 pm",
    "1:00 pm - 1:30 pm",
    "1:30 pm - 2:00 pm",
    "2:00 pm - 2:30 pm",
    "2:30 pm - 3:00 pm",
    "3:00 pm - 3:30 pm",
    "3:30 pm - 4:00 pm",
    "4:00 pm - 4:30 pm",
    "4:30 pm - 5:00 pm",
  ];

  const handleTimeSelect = (slot) => {
    setTimeSlot(slot);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Select Date:</h2>
            <Calendar onChange={setDate} value={date} className="my-4" />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Select Times*:</h2>
            <div className="grid grid-cols-2 gap-2">
              {/* AM Time Slots */}
              <div className="flex flex-col gap-2">
                {timeSlots.filter(slot => slot.includes('am')).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className={`p-2 border rounded-md transition duration-200 
                  ${timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {/* PM Time Slots */}
              <div className="flex flex-col gap-2">
                {timeSlots.filter(slot => slot.includes('pm')).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className={`p-2 border rounded-md transition duration-200 
                  ${timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 flex justify-end">Selected Time: {timeSlot} on {date.toLocaleDateString()}</p>
        <div className="flex justify-end">
          <button className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Book
          </button>
        </div>
      </div>
    </>
  );
};

export default MyCalendar;