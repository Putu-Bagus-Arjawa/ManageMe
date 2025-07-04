import { createContext, useContext, useEffect, useState } from "react";

const LevelTresholdContext = createContext();

export const LevelTresholdProvider = ({ children }) => {
  const [tresholdLevel, setTresholdLevel] = useState(null);
  const [loadingTreshold, setLoadingTreshold] = useState(true);

  useEffect(() => {
    const fetchTreshold = async () => {
      const res = await fetch("http://localhost:9000/level/tresholds", {
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setTresholdLevel(data.EXP_LEVEL_THRESHOLDS);
      }
      setLoadingTreshold(false);
    };
    fetchTreshold();
  }, []);

  return (
    <LevelTresholdContext.Provider value={{ tresholdLevel, loadingTreshold }}>
      {children}
    </LevelTresholdContext.Provider>
  );
};

export const useLevelTresholdContext = () => useContext(LevelTresholdContext);
