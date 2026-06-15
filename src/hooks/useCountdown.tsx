"use client";
import { useEffect, useState } from "react";
import { formatSecondsToHMS } from "@/lib/formatTime";
import { useLocalStorage } from "./useLocalStorage";

export const useCountdown = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  const {
    value: storedTimeLeft,
    setItem: setTimeLeftStorage,
    isInitialized,
  } = useLocalStorage<number>("timeLeft");

  useEffect(() => {
    if (isInitialized && storedTimeLeft !== undefined) {
      setTimeLeft(storedTimeLeft);
    }
  }, [isInitialized, storedTimeLeft]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const next = timeLeft - 1;
      setTimeLeft(next);
      setTimeLeftStorage({ key: "timeLeft", value: next });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, setTimeLeftStorage, timeLeft]);

  return {
    timeLeft: formatSecondsToHMS(timeLeft),
    isRunning,
    setTimeLeft,
    setIsRunning,
  };
};
