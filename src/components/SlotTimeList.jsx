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
  function convertSecondsToHoursAndMinutes(seconds, offset, currdate) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    // const adjustedDate = new Date(date.getTime() + offset * 1000); // Apply timezone offset
    const utcDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    ); // Convert to UTC
    const adjustedDate = new Date(utcDate.getTime() + offset * 1000); // Apply timezone offset

    const day = adjustedDate.getUTCDate();
    const hours = adjustedDate.getUTCHours();
    const minutes = adjustedDate.getUTCMinutes();

    return {
      day,
      hoursandminute: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`,
    };
  }

  // Function to generate time slots with a specified interval and timezone offset
  function generateTimeSlots(startTime, endTime, interval, offset, date) {
    const slots = [];
    const nextSlots = [];

    let currentSlotStart = startTime;
    while (currentSlotStart < endTime) {
      const roundedStartTime =
        Math.ceil(currentSlotStart / interval) * interval;
      const roundedEndTime = Math.min(
        Math.ceil(endTime / interval) * interval,
        roundedStartTime + interval
      );

      if (
        convertSecondsToHoursAndMinutes(roundedStartTime, offset, date)?.day ===
        2
      ) {
        nextSlots.push({
          start: convertSecondsToHoursAndMinutes(roundedStartTime, offset, date)
            ?.hoursandminute,
          end: convertSecondsToHoursAndMinutes(roundedEndTime, offset, date)
            ?.hoursandminute,
        });
      } else {
        slots.push({
          start: convertSecondsToHoursAndMinutes(roundedStartTime, offset, date)
            ?.hoursandminute,
          end: convertSecondsToHoursAndMinutes(roundedEndTime, offset, date)
            ?.hoursandminute,
        });
      }

      currentSlotStart = roundedEndTime;
    }

    return { slots, nextSlots };
  }

  // Process time slots data
  useEffect(() => {
    // if (timeSlots) {
    //   let updatedTimeSlots = [];
    //   if (timeSlots[selectedDate]?.length > 0) {
    //     updatedTimeSlots = timeSlots[selectedDate].map((slot) => ({
    //       slots: generateTimeSlots(
    //         slot.startTime,
    //         slot.endTime,
    //         intervalInSeconds,
    //         TimeZone.value
    //       ),
    //     }));
    //   }

    //   setDisplayTimeSlots(updatedTimeSlots);
    // }
    if (timeSlots) {
      const updatedTimeSlots = {};
      Object.keys(timeSlots).forEach((date) => {
        if (timeSlots[date].length > 0) {
          if (updatedTimeSlots[date]?.length > 0) {
            const newArr = timeSlots[date].map((slot) => {
              const allTimeSlots = generateTimeSlots(
                slot.startTime,
                slot.endTime,
                intervalInSeconds,
                TimeZone.value,
                date
              );

              if (allTimeSlots.nextSlots?.length > 0) {
                const dateNumber = date?.slice(-2);
                const nextDate = `2023-12-${(parseInt(dateNumber) + 1)
                  .toString()
                  .padStart(2, "0")}`;

                updatedTimeSlots[nextDate] = [
                  { slots: allTimeSlots.nextSlots },
                ];

                return { slots: allTimeSlots.slots };
              } else {
                return { slots: allTimeSlots.slots };
              }
            });

            updatedTimeSlots[date] = [...updatedTimeSlots[date], ...newArr];
          } else {
            updatedTimeSlots[date] = timeSlots[date].map((slot) => {
              const allTimeSlots = generateTimeSlots(
                slot.startTime,
                slot.endTime,
                intervalInSeconds,
                TimeZone.value,
                date
              );

              if (allTimeSlots.nextSlots?.length > 0) {
                const dateNumber = date?.slice(-2);
                const nextDate = `2023-12-${(parseInt(dateNumber) + 1)
                  .toString()
                  .padStart(2, "0")}`;

                updatedTimeSlots[nextDate] = [
                  { slots: allTimeSlots.nextSlots },
                ];

                return { slots: allTimeSlots.slots };
              } else {
                return { slots: allTimeSlots.slots };
              }
            });
          }
        }
      });

      setDisplayTimeSlots(updatedTimeSlots);
    }
  }, [timeSlots, TimeZone]);

  return (
    <div className="border-l border-solid pl-8">
      <div className="text-sm text-[#71717A] mb-2">
        <span className="inline-block font-medium text-darkgray mr-1">
          {getFormattedDay.formattedDay}
        </span>
        <span>{getFormattedDay.formattedDate}</span>
      </div>

      <ul className="flex flex-col gap-y-2 overflow-auto h-[600px]">
        {displayTimeSlots[selectedDate] &&
          displayTimeSlots[selectedDate].map((daySlots, index) =>
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
