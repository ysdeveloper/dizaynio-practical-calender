"use client";
import { useTimeContext } from "@/context/TimeContext";
import { formatDateWithMoment } from "@/utils/functions";
import React, { useEffect, useState } from "react";

const SlotTimeList = () => {
  const intervalInSeconds = 900;
  const { selectedDate, TimeZone } = useTimeContext();
  const [timeSlots, setTimeSlots] = useState({});
  const [displayTimeSlots, setDisplayTimeSlots] = useState([]);

  const getFormattedDay = formatDateWithMoment(selectedDate);

  // Fetch the time slots data
  useEffect(() => {
    const getTimeSlotsData = async () => {
      const timeSlotsRes = await fetch(
        `https://run.mocky.io/v3/937c8833-479a-4edd-b523-02dd994025e8`
      );
      const timeSlotsData = await timeSlotsRes.json();
      setTimeSlots(timeSlotsData);
    };

    getTimeSlotsData();
  }, []);

  // Function to convert seconds to HH:mm format with timezone adjustment
  function convertSecondsToHoursAndMinutes(seconds, offset) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const adjustedDate = new Date(date.getTime() + offset * 1000); // Apply timezone offset

    const hours = adjustedDate.getUTCHours();
    const minutes = adjustedDate.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  // Function to generate time slots with a specified interval and timezone offset
  function generateTimeSlots(startTime, endTime, interval, offset) {
    const slots = [];
    let currentSlotStart = startTime;
    while (currentSlotStart < endTime) {
      const roundedStartTime =
        Math.ceil(currentSlotStart / interval) * interval;
      const roundedEndTime = Math.min(
        Math.ceil(endTime / interval) * interval,
        roundedStartTime + interval
      );

      slots.push({
        start: convertSecondsToHoursAndMinutes(roundedStartTime, offset),
        end: convertSecondsToHoursAndMinutes(roundedEndTime, offset),
      });

      currentSlotStart = roundedEndTime;
    }
    return slots;
  }

  // Process time slots data
  useEffect(() => {
    if (timeSlots) {
      let updatedTimeSlots = [];
      if (timeSlots[selectedDate]?.length > 0) {
        updatedTimeSlots = timeSlots[selectedDate].map((slot) => ({
          slots: generateTimeSlots(
            slot.startTime,
            slot.endTime,
            intervalInSeconds,
            TimeZone.value
          ),
        }));
      }

      setDisplayTimeSlots(updatedTimeSlots);
    }
  }, [selectedDate, timeSlots, TimeZone]);

  return (
    <div className="border-l border-solid pl-8">
      <div className="text-sm text-[#71717A] mb-2">
        <span className="inline-block font-medium text-darkgray mr-1">
          {getFormattedDay.formattedDay}
        </span>
        <span>{getFormattedDay.formattedDate}</span>
      </div>

      <ul className="flex flex-col gap-y-2 overflow-auto h-[600px]">
        {displayTimeSlots &&
          displayTimeSlots.map((daySlots, index) =>
            daySlots.slots.map((slot, idx) => (
              <li
                key={idx}
                className="py-[10px] px-[65px] rounded-[4px] border border-solid border-[#EEEEEE] text-darkgray font-medium"
              >
                {slot.start}
              </li>
            ))
          )}
      </ul>
    </div>
  );
};

export default SlotTimeList;
