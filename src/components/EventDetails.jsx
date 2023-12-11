"use client";
import { useTimeContext } from "@/context/TimeContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EventDetails = () => {
  const [TimeZoneOptions, setTimeZoneOptions] = useState();
  const [EventDetails, setEventDetails] = useState();
  const { TimeZone, setTimeZone } = useTimeContext();

  const getTimeZoneData = () => {
    return fetch(
      `https://run.mocky.io/v3/0e281aa4-ea6c-4139-8e69-0eecfed355f5`
    ).then((response) => response.json());
  };

  const getEventDetails = () => {
    return fetch(
      `https://run.mocky.io/v3/a8eb59cf-b3a1-48e2-9171-809cbe8ecc04`
    ).then((response) => response.json());
  };

  useEffect(() => {
    Promise.all([getTimeZoneData(), getEventDetails()])
      .then(([timezonedata, eventDetailsData]) => {
        setTimeZoneOptions(timezonedata);
        setEventDetails(eventDetailsData.event);
        setTimeZone({
          code: eventDetailsData.event?.timezone?.code,
          label: eventDetailsData.event?.timezone?.label,
          offset: eventDetailsData.event?.timezone?.offset,
          value: eventDetailsData.event?.timezone?.seconds,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="pr-8 w-[244px]">
      <h3 className="font-semibold text-lg text-[#18181B]">
        {EventDetails?.name}
      </h3>
      <p className="text-xs tracking-normal mb-3">
        {EventDetails?.description}
      </p>
      <ul className="space-y-[14px]">
        <li className="flex gap-2">
          <Image
            src="/assets/icon/clock.svg"
            width={20}
            height={20}
            alt="Clock"
          />
          <span className="inline-block text-sm font-medium text-darkgray">
            {EventDetails?.duration?.label}
          </span>
        </li>
        <li className="flex gap-2">
          <Image
            src="/assets/icon/google-meet.svg"
            width={20}
            height={20}
            alt="Clock"
          />
          <span className="inline-block text-sm font-medium text-darkgray">
            {EventDetails?.location?.label}
          </span>
        </li>
        <li className="flex gap-2">
          <Image
            src="/assets/icon/global.svg"
            width={20}
            height={20}
            alt="Clock"
          />
          <span className="inline-block text-sm font-medium text-darkgray">
            <select
              className="w-full"
              value={TimeZone?.code}
              onChange={(e) => {
                const timeZone = TimeZoneOptions.find(
                  (zone) => zone.code === e.target.value
                );
                setTimeZone(timeZone);
              }}
            >
              {TimeZoneOptions?.map((zone) => (
                <option key={zone.code} value={zone.code}>
                  {zone.label}
                </option>
              ))}
            </select>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default EventDetails;
