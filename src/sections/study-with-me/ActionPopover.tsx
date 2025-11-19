import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export const ActionPopover = ({
  form,
  triggerEl,
  onSubmit,
  open,
  setOpen,
}: {
  form: UseFormReturn<{
    backgroundImage: string;
    hours: number;
    minutes: number;
  }>;
  triggerEl: React.ReactNode;
  onSubmit: (data: {
    backgroundImage: string;
    hours: number;
    minutes: number;
  }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { handleSubmit, control, setValue } = form;
  const { value: studyWithMeStorage } = useLocalStorage<{
    backgroundImage: string;
    hours: number;
    minutes: number;
  }>("studyWithMe");

  useEffect(() => {
    if (!studyWithMeStorage) return;

    setValue("backgroundImage", studyWithMeStorage?.backgroundImage || "");
    setValue("hours", studyWithMeStorage?.hours || 0);
    setValue("minutes", studyWithMeStorage?.minutes || 0);
  }, [setValue, studyWithMeStorage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerEl}</PopoverTrigger>
      <PopoverContent className="p-3 mr-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-xl flex flex-col gap-2">
            <Controller
              name="backgroundImage"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Background Image URL"
                  className="w-full"
                  {...field}
                />
              )}
            />

            <div className="flex items-center justify-center gap-2">
              <Controller
                name="hours"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="Hours"
                    className="w-full"
                    {...field}
                  />
                )}
              />

              <Controller
                name="minutes"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="Minutes"
                    className="w-full"
                    {...field}
                  />
                )}
              />
            </div>

            <hr className="my-2" />

            <div className="flex items-center justify-center gap-2 w-full">
              <Button className="flex-1" type="submit">
                Save
              </Button>
              <Button
                variant="outline"
                className="text-black flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
