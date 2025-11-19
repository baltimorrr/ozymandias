"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EllipsisVerticalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { ActionPopover } from "@/sections/study-with-me/ActionPopover";
import { useState } from "react";
import { Timer } from "@/sections/study-with-me/Timer";
import { useCountdown } from "@/hooks/useCountdown";
import { Spinner } from "@/components/ui/spinner";

export default function StudyWithMe() {
  const [actionPopoverOpen, setActionPopoverOpen] = useState(false);
  const {
    value: studyWithMe,
    setItem: setStudyWithMeStorage,
    isInitialized: isStudyWithMeInitialized,
  } = useLocalStorage<{
    backgroundImage: string;
    hours: number;
    minutes: number;
  }>("studyWithMe");
  const { value: timeLeft, setItem: setTimeLeftStorage } =
    useLocalStorage<number>("timeLeft");
  const timeStorage =
    (Number(studyWithMe?.hours || 0) * 60 + Number(studyWithMe?.minutes || 0)) *
    60;

  const form = useForm({
    defaultValues: {
      backgroundImage: "",
      hours: 0,
      minutes: 0,
    },
  });

  const countDownObject = useCountdown({
    time: timeStorage || timeLeft || 12 * 60 * 60,
  });

  const onSubmit = (data: {
    backgroundImage: string;
    hours: number;
    minutes: number;
  }) => {
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
    console.log("time", data);
    countDownObject.setTimeLeft(
      (Number(data.hours) * 60 + Number(data.minutes)) * 60
    );
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${
          studyWithMe?.backgroundImage ||
          "https://images.unsplash.com/photo-1758132123976-6730692335f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1829"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!isStudyWithMeInitialized ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner className="size-10 text-white" />
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4">
            <ActionPopover
              form={form}
              triggerEl={<EllipsisVerticalIcon className="size-4" />}
              onSubmit={onSubmit}
              open={actionPopoverOpen}
              setOpen={setActionPopoverOpen}
            />
          </div>

          <Timer
            timeStorage={
              (Number(studyWithMe?.hours || 0) * 60 +
                Number(studyWithMe?.minutes || 0)) *
              60
            }
            countDownObject={countDownObject}
          />
        </>
      )}
    </div>
  );
}
