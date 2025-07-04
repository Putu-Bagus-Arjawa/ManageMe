
import { useEffect, useState } from "react";
import { useUserContext } from "../Context/UserContext";
import { useLevelLabelContext } from "../Context/LevelLabelContext";

export const useLevelLabelName = () => {
  const { user, loading } = useUserContext();
  const { levelLabels, loadingLabels } = useLevelLabelContext();
  const [label, setLabel] = useState("Rawr");

  useEffect(() => {
    if (!loading && !loadingLabels && user && levelLabels?.length > 0) {
      const found = levelLabels.find(
        (item) =>
          user.level >= item.min_level && user.level <= item.max_level
      );
      if (found) setLabel(found.label_name);
    }
  }, [user, levelLabels, loading, loadingLabels]);

  return label;
};