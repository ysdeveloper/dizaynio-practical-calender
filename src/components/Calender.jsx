"use client";
import { useTimeContext } from "@/context/TimeContext";
import React, { useEffect, useState } from "react";

const Calender = () => {
  const [totalDays, setTotalDays] = useState([]);
  const { selectedDate, setSelectedDate } = useTimeContext();

  useEffect(() => {
    function getDecemberDays() {
      const decemberDays = [];
      const daysInDecember = new Date(2023, 12, 0).getDate();

      for (let day = 1; day <= daysInDecember; day++) {
        decemberDays.push({
          day,
          value: `2023-12-${day.toString().padStart(2, "0")}`,
        });
      }

      return decemberDays;
    }
    setTotalDays(getDecemberDays());
  }, []);

  return (
    <div className="px-8 border-l border-solid w-[479px]">
      <div className="flex justify-between items-center">
        <svg
          width="8"
          height="15"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1.5L1 7.5L7 13.5"
            stroke="#71717A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-sm text-[#71717A]">
          <span className="inline-block font-medium text-darkgray mr-1">
            December
          </span>
          <span>2023</span>
        </div>
        <svg
          width="8"
          height="15"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 13.5L7 7.5L1 1.5"
            stroke="#71717A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul className="flex gap-[10px] text-sm font-medium text-darkgray">
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          sun
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          mon
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          tue
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          wed
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          thu
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          fri
        </li>
        <li className="uppercase w-[50px] aspect-square flex items-center justify-center">
          sat
        </li>
      </ul>

      <ul className="gap-[5px] grid grid-cols-7">
        {totalDays?.map((day, i) => {
          return (
            <li
              key={i}
              onClick={() => setSelectedDate(day.value)}
              className={`w-[55px] aspect-square flex items-center justify-center rounded-[4px] font-medium hover:text-white hover:bg-[#2D8AA7] transition-all cursor-pointer${
                i === 0 ? " col-start-6" : ""
              }${
                day.value === selectedDate
                  ? " bg-[#2D8AA7] text-white"
                  : " bg-[#f7f9fa] text-darkgray"
              }`}
            >
              {day.day}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calender;
