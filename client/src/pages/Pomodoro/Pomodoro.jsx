// Pomodoro.jsx
import { useNavigate } from "react-router";
import Dashboard from "../../Components/Dashboard";
import LevelSection from "../../Components/LevelSection";

export default function Pomodoro() {
  const navigate = useNavigate();

  const options = [
    { label: "50:10", start: 50, end: 10 },
    { label: "35:15", start: 35, end: 15 },
    { label: "25:5",  start: 25, end: 5 },
    { label: "1:5",  start: 1, end: 5 },
  ];

  const handleClick = (start, end) => {
    navigate(`/pomodoro/${start}/${end}`);
  };

  return (
    <Dashboard>
      <LevelSection/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-20">
        {options.map((item) => (
          <div
            key={item.label}
            className="bg-white shadow-md rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(item.start, item.end)}
          >
            <h3 className="text-2xl font-bold">{item.label}</h3>
            <p className="text-gray-600 mt-2">Fokus {item.start} menit, istirahat {item.end} menit</p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
