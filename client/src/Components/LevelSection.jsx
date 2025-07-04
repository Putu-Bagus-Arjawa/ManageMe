import { useLevelTresholdContext } from "../Context/LevelTresholdContext";
import { useUserContext } from "../Context/UserContext";
import { useLevelLabelName } from './useLevelLabelName'



const LevelSection = () => {
  const { user, loading } = useUserContext()
  const { tresholdLevel, loadingTreshold } = useLevelTresholdContext()
  const label =  useLevelLabelName()


  const isDataReady = !loading && !loadingTreshold
  if (!isDataReady) return <div>Loading...</div>;

  const next = tresholdLevel.find((t) => t.level === user.level + 1)

  return (
    <nav className="fixed t-0 w-4/5 z-10 flex justify-center items-center rounded-full bg-linear-to-br from-primary via-secondary to-triary px-20 py-8 shadow-lg shadow-cyan-900">
      <div className="flex gap-x-4 w-full items-start ">
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
    </nav>
  );
};

export default LevelSection;
