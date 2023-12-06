"use client";

import { createContext, useContext, useState } from "react";

const TimeContext = createContext();

export const TimeContextProvider = ({ children }) => {
  const [TimeZone, setTimeZone] = useState({
    code: "Asia/Kolkata",
    label: "Asia/Kolkata (GMT+05:30)",
    offset: "GMT+05:30",
    value: 19800,
  });
  const [selectedDate, setSelectedDate] = useState("2023-12-01");

  return (
    <TimeContext.Provider
      value={{ TimeZone, setTimeZone, selectedDate, setSelectedDate }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const ctx = useContext(TimeContext);
  if (ctx) {
    return ctx;
  }

  return "There is no any time context available";
};
