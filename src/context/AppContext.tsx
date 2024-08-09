import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchRandomText } from '../API/fetchRandomText';

interface AppContextProps {
  text: string;
  input: string;
  setInput: (input: string) => void;
  errors: number;
  setErrors: (errors: number) => void;
  startTime: number | null;
  setStartTime: (startTime: number) => void;
  reset: () => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  isTimeUp: boolean;
  setIsTimeUp: (time: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  text: "Loading...",
  input: "",
  setInput: () => {},
  errors: 0,
  setErrors: () => {},
  startTime: null,
  setStartTime: () => {},
  reset: () => {},
  timeLeft: 15,
  setTimeLeft: () => {},
  isTimeUp: false,
  setIsTimeUp: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [text, setText] = useState("Loading...");
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const loadRandomText = async () => {
    const newText = await fetchRandomText();
    setText(newText);
  };

  const reset = async () => {
    await loadRandomText();
    setInput("");
    setErrors(0);
    setStartTime(null);
    setIsTimeUp(false);
    setTimeLeft(15); 
  };

  useEffect(() => {
    loadRandomText();
  }, []);

  useEffect(() => {
    if (startTime && !isTimeUp) {
      const interval = setInterval(() => {
        // const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(interval);
            setIsTimeUp(true);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isTimeUp]);

  return (
    <AppContext.Provider value={{ text, input, setInput, errors, setErrors, startTime, setStartTime, reset, timeLeft, setTimeLeft, isTimeUp, setIsTimeUp }}>
      {children}
    </AppContext.Provider>
  );
};
