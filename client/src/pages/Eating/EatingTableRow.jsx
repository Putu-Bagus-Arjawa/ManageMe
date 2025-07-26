import { Pencil, Save } from "lucide-react";
import { Link } from "react-router";

const EatingTableRow = 
({ day, items, price, descprice, isDone, exp }) => {
  const isFinished = isDone === "Finished";
  const rowBg = day % 2 === 0 ? "bg-gray-200" : "bg-white";

  return (
    <tr className={`border-b border-green-200 hover:bg-gray-100 ${rowBg}`}>
      <td className="py-3 px-6 text-center whitespace-nowrap">{day}</td>
      <td className="py-3 px-6 text-center">{items}</td>
      <td className="py-3 px-6 text-center">{price}</td>
      <td className="py-3 px-6 text-left">{descprice}</td>
      <td className="py-3 px-6 text-left">{exp}</td>
      <td className="py-3 px-6 text-center">
        <Link
          to={isDone == "Unfinished"? `/eating/status/${day}`: ""}
          className={`py-1 px-3 rounded-full text-xs font-semibold
            ${isFinished ? "bg-green-300 text-green-800" : "bg-red-200 text-red-800"}
            focus:outline-none ${isFinished ? 'cursor-not-allowed' : ''}`}
        >
          {isDone}
        </Link>
      </td>
      <td>
        <Link to={`/eating/modify/${day}`} className="hover:text-amber-400">
            <Pencil/>
        </Link>
        </td>
    </tr>
  );
};

export default  EatingTableRow