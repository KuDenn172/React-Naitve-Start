import {useState, useEffect, useCallback, useRef} from 'react';
import {formatTimeSeconds} from '~/utils/time';

export const useCountdown = ({
  initialTime = 0,
  interval = 1000,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(initialTime || 0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prevCountdown - 1;
        });
      }, interval);
    } else {
      setIsRunning(false);
      onComplete?.();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, countdown, onComplete, interval]);

  const startCountdown = useCallback(time => {
    setCountdown(time);
    setIsRunning(true);
  }, []);

  const stopCountdown = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    countdown,
    isRunning,
    startCountdown,
    stopCountdown,
    timeString: formatTimeSeconds(countdown),
  };
};
