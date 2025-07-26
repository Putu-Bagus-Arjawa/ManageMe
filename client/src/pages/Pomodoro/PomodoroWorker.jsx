import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import Dashboard from "../../Components/Dashboard";
import LevelSection from "../../Components/LevelSection"; 

export default function PomodoroWorker() {
  const { start, end } = useParams();
  
  const timerConfig = useRef({
    start: parseInt(start) * 60,
    end: parseInt(end) * 60
  });

  const [time, setTime] = useState(timerConfig.current.start);
  const [phase, setPhase] = useState("idle");
  const timerRef = useRef(null);

  const startCycle = () => {
    if (phase === "idle" || phase === "done") {
      setTime(timerConfig.current.start);
      setPhase("start");
    }
  };

  useEffect(() => {
    if (phase === "idle" || phase === "done") {
      return;
    }

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          
          if (phase === "start") {
            setPhase("end");
            return timerConfig.current.end;
          } else {
            setPhase("done");
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); 

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Dashboard>
      <LevelSection/>
      <div className="text-center mt-50">
        <h3 className="text-lg font-bold mb-2">Pomodoro Worker</h3>
        <div className="text-4xl font-mono">{formatTime(time)}</div>
        <p className="mt-1 text-gray-500">
          {phase === "start"
            ? "⏳ Sedang Berkultivasi"
            : phase === "end"
            ? "☕ Konsolidasi"
            : phase === "done"
            ? "✅ Selesai"
            : "💤 Idle"}
        </p>

        <button
          onClick={startCycle}
          disabled={phase === "start" || phase === "end"}
          className={`mt-4 px-4 py-2  font-semibold text-white rounded-2xl ${
            phase === "start" || phase === "end"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {phase === "done" ? "Ulangi Siklus" : "Mulai"}
        </button>
      </div>
    </Dashboard>
  );
}