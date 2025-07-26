import { createContext, useContext, useEffect, useState } from "react";

const LevelLabelContext = createContext();

export const LevelLabelProvider = ({ children }) => {
  const [levelLabels, setLevelLabels] = useState(null);
  const [loadingLabels, setLoadingLabels] = useState(true);


    const fetchLabels = async () => {
      const res = await fetch("http://localhost:9000/level/labels", {
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setLevelLabels(data.LEVEL_LABELS);
      }
      setLoadingLabels(false);
    };

  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <LevelLabelContext.Provider value={{ levelLabels, loadingLabels,fetchLabels }}>
      {children}
    </LevelLabelContext.Provider>
  );
};

export const useLevelLabelContext = () => useContext(LevelLabelContext);
