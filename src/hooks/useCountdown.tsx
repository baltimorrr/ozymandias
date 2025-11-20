"use client";
import { useEffect, useState } from "react";
import { formatSecondsToHMS } from "@/lib/formatTime";
import { useLocalStorage } from "./useLocalStorage";

export const useCountdown = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  const { value: timeLeftStorage, setItem: setTimeLeftStorage } =
    useLocalStorage<number>("timeLeft");

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTimeLeftStorage({ key: "timeLeft", value: timeLeft - 1 });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, setTimeLeftStorage, timeLeft]);

  return {
    timeLeft: formatSecondsToHMS(timeLeft),
    isRunning,
    setTimeLeft,
    setIsRunning,
  };
};
