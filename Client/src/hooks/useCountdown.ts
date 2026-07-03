import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountdownOptions {
  initialSeconds: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

interface UseCountdownReturn {
  seconds: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  reset: (newSeconds?: number) => void;
  formattedTime: string;
}

export const useCountdown = ({
  initialSeconds,
  autoStart = true,
  onComplete,
}: UseCountdownOptions): UseCountdownReturn => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(
    (newSeconds?: number) => {
      setSeconds(newSeconds ?? initialSeconds);
      setIsRunning(true);
    },
    [initialSeconds]
  );

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return {
    seconds,
    isRunning,
    isComplete: seconds === 0,
    start,
    reset,
    formattedTime,
  };
};