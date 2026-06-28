import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCountdown } from "@/hooks/useCountdown";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1758132123976-6730692335f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1829";

const BASE_TITLE = "Study With Me";

type StudyWithMeValues = {
  backgroundImage: string;
  hours: number;
  minutes: number;
};

export const useStudyWithMe = () => {
  const [actionPopoverOpen, setActionPopoverOpen] = useState(false);

  const {
    value: studyWithMe,
    setItem: setStudyWithMeStorage,
    isInitialized: isStudyWithMeInitialized,
  } = useLocalStorage<StudyWithMeValues>("studyWithMe");

  const { value: timeLeft, setItem: setTimeLeftStorage } =
    useLocalStorage<number>("timeLeft");

  const form = useForm<StudyWithMeValues>({
    defaultValues: {
      backgroundImage: "",
      hours: 0,
      minutes: 0,
    },
  });

  const timeStorage =
    (Number(studyWithMe?.hours || 0) * 60 + Number(studyWithMe?.minutes || 0)) *
    60;

  const countDownObject = useCountdown({
    time: timeStorage || timeLeft || 12 * 60 * 60,
  });

  const onSubmit = (data: StudyWithMeValues) => {
    setStudyWithMeStorage({
      key: "studyWithMe",
      value: {
        ...data,
        hours: Number(data?.hours || 0),
        minutes: Number(data?.minutes || 0),
      },
    });
    setTimeLeftStorage({
      key: "timeLeft",
      value: (Number(data.hours) * 60 + Number(data.minutes)) * 60,
    });
    setActionPopoverOpen(false);
    countDownObject.setIsRunning(false);
    countDownObject.setTimeLeft(
      (Number(data.hours) * 60 + Number(data.minutes)) * 60,
    );
  };

  const backgroundImage =
    isStudyWithMeInitialized && studyWithMe?.backgroundImage
      ? studyWithMe.backgroundImage
      : DEFAULT_BG;

  useEffect(() => {
    console.log("studyWithMe", countDownObject.timeLeft);
    document.title = `${countDownObject?.timeLeft} | ${BASE_TITLE}`;
  }, [countDownObject.timeLeft]);

  return {
    actionPopoverOpen,
    setActionPopoverOpen,
    studyWithMe,
    isStudyWithMeInitialized,
    form,
    countDownObject,
    onSubmit,
    backgroundImage,
  };
};
