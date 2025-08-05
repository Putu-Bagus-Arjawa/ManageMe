import { BadgeQuestionMark, Timer, TimerIcon } from "lucide-react";
import { useLevelTresholdContext } from "../Context/LevelTresholdContext";
import { useUserContext } from "../Context/UserContext";
import Loading from "./Loading";
import { useLevelLabelName } from './useLevelLabelName'
import { Link } from "react-router";
import { useLevelLabelContext } from "../Context/LevelLabelContext";



const LevelSection = () => {
  const { user, loading } = useUserContext()
  const { tresholdLevel, loadingTreshold } = useLevelTresholdContext()
  const {loadingLabel} = useLevelLabelContext()
  const label =  useLevelLabelName()



  const isDataReady = !loading && !loadingTreshold && !loadingLabel
  if (!isDataReady) return  <Loading/>
  
  const next = tresholdLevel?.find((t) => t.level === user.level + 1);



  return (
    <nav className="fixed top-0 right-2 w-4/5 rounded-2xl z-10 px-20 py-8 bg-linear-to-bl from-indigo-500 via-fuchsia-400 to-violet-500">
      <div className="flex justify-between gap-x-4 w-full items-start">
    <div className="flex gap-x-8">
        <Link to={"/faq"} className="text-green-200"> <BadgeQuestionMark /></Link>
        <Link to={"/pomodoro"}className="text-green-200 text-2xl"><Timer/></Link>
      </div>
        <div className="flex gap-x-4">
          <span className="font-aldrich text-teal-400">Level {user.level}</span>
          <p className="font-aldrich text-blue-300">
            Ki Point {user.current_exp} / {next?.exp_required ?? "Max"}
          </p>
          <span className="bg-green-100/20 border border-green-400 text-green-300 px-3 py-1 rounded-full shadow-inner backdrop-blur-sm font-semibold text-sm">
           {label}
          </span>
        </div>
      </div>
      {console.log("TRESHOLD:", tresholdLevel)}
      {console.log("IS LOADING:", loadingTreshold)}
    </nav>
  );
};

export default LevelSection;

