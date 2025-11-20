import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export const Timer = ({
  timeStorage,
  countDownObject,
}: {
  timeStorage: number;
  countDownObject: {
    timeLeft: string;
    isRunning: boolean;
    setTimeLeft: (time: number) => void;
    setIsRunning: (isRunning: boolean) => void;
  };
}) => {
  const { timeLeft, isRunning, setTimeLeft, setIsRunning } = countDownObject;
  const { value: timeLeftStorage, setItem: setTimeLeftStorage } =
    useLocalStorage<number>("timeLeft");

  useEffect(() => {
    setTimeLeft(timeLeftStorage || timeStorage || 12 * 60 * 60);
  }, [setTimeLeft, timeLeftStorage, timeStorage]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline">Promodoro</Button>

        <Button variant="outline">Short Break</Button>

        <Button variant="outline">Long Break</Button>
      </div>

      <h1 className="text-[80px] font-bold text-white">{timeLeft}</h1>

      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            setTimeLeftStorage({ key: "timeLeft", value: timeStorage });
            setIsRunning(false);
          }}
        >
          Reset
        </Button>

        <Button
          onClick={() => {
            setTimeLeftStorage({ key: "timeLeft", value: timeStorage });
            setIsRunning(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
