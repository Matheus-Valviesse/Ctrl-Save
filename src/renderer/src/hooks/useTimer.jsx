import { useState, useRef, useEffect } from "react";

export function useTimer(initialTime = 5) {
  const [timer, setTimer] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  const start = () => {
    if (timerRef.current) return;

    setIsRunning(true)

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current)
          timerRef.current = null
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Reseta o timer pro valor inicial
  const reset = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimer(initialTime);
    setIsRunning(false);
    start()
  };

  // Coloca em zero direto
  const setZero = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimer(0);
    setIsRunning(false);
  };

  // Limpa o timer ao desmontar o componente
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return { timer, isRunning, start, reset, setZero };
}