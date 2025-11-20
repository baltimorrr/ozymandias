import { intervalToDuration } from "date-fns";

export const formatSecondsToHMS = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const totalHours =
    Number(duration?.hours || 0) + Number(duration?.days || 0) * 24;
  const hours = totalHours > 9 ? totalHours : `0${totalHours}`;
  const minutes =
    Number(duration?.minutes || 0) > 9
      ? duration?.minutes
      : `0${duration?.minutes || 0}`;
  const secondsValue =
    Number(duration?.seconds || 0) > 9
      ? duration?.seconds
      : `0${duration?.seconds || 0}`;
  return `${hours}:${minutes}:${secondsValue}`;
};
