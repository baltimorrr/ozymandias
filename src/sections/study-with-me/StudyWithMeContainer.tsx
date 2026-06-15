"use client";
import { Spinner } from "@/components/ui/spinner";
import { EllipsisVerticalIcon } from "lucide-react";
import { ActionPopover } from "./ActionPopover";
import { Timer } from "./Timer";
import { useStudyWithMe } from "./hooks/useStudyWithMe";

export const StudyWithMeContainer = () => {
  const {
    backgroundImage,
    isStudyWithMeInitialized,
    form,
    onSubmit,
    actionPopoverOpen,
    setActionPopoverOpen,
    studyWithMe,
    countDownObject,
  } = useStudyWithMe();

  return (
    <div
      suppressHydrationWarning
      className="h-screen w-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
};
