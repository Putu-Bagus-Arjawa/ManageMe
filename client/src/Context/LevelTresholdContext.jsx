import { createContext, useContext, useEffect, useState } from "react";

const LevelTresholdContext = createContext();

export const LevelTresholdProvider = ({ children }) => {
  const [tresholdLevel, setTresholdLevel] = useState([]);
  const [loadingTreshold, setLoadingTreshold] = useState(true);

  const fetchTreshold = async () => {
    setLoadingTreshold(true);
    try {
      const res = await fetch("http://localhost:9000/level/tresholds", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setTresholdLevel(data.EXP_LEVEL_THRESHOLDS);
      } else {
        console.error("Fetch failed:", data);
        setTresholdLevel([]); 
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setTresholdLevel([]); 
    } finally {
      setLoadingTreshold(false);
    }
  };

  useEffect(() => {
    fetchTreshold();
  }, []);

  return (
    <LevelTresholdContext.Provider value={{ tresholdLevel, loadingTreshold, fetchTreshold }}>
      {children}
    </LevelTresholdContext.Provider>
  );
};

export const useLevelTresholdContext = () => useContext(LevelTresholdContext);
