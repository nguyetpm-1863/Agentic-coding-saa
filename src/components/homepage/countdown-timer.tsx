"use client";

import { useEffect, useState } from "react";
import DigitBox from "@/components/homepage/digit-box";

interface CountdownTimerProps {
  targetDate: string;
  labels: {
    days: string;
    hours: string;
    minutes: string;
  };
}

function computeTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00" };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
  };
}

export default function CountdownTimer({
  targetDate,
  labels,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00" });

  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const groups = [
    { value: timeLeft.days, label: labels.days },
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.minutes },
  ];

  return (
    <div
      aria-live="polite"
      className="flex flex-wrap gap-6 md:gap-10"
    >
      <span className="sr-only">
        {timeLeft.days} {labels.days}, {timeLeft.hours} {labels.hours},{" "}
        {timeLeft.minutes} {labels.minutes} remaining
      </span>
      {groups.map((group) => (
        <div
          key={group.label}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="flex gap-2 md:gap-3.5">
            <div className="w-12 h-16 md:w-[51px] md:h-[82px] [&>div]:w-full [&>div]:h-full">
              <DigitBox digit={group.value[0]} />
            </div>
            <div className="w-12 h-16 md:w-[51px] md:h-[82px] [&>div]:w-full [&>div]:h-full">
              <DigitBox digit={group.value[1]} />
            </div>
          </div>
          <span
            className="text-[16px] md:text-[24px] font-bold text-[#FFEA9E]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {group.label}
          </span>
        </div>
      ))}
    </div>
  );
}
