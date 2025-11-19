import { intervalToDuration } from "date-fns";

export const formatSecondsToHMS = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  console.log("duration", duration);
  const hours =
    Number(duration?.hours || 0) > 9
      ? Number(duration?.hours || 0) + Number(duration?.days || 0) * 24
      : `0${duration?.hours || 0}`;
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
