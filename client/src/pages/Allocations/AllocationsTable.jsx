import { Pencil, Save } from "lucide-react";
import { Link } from "react-router";

const AllocationTableRow = ({ no, items, price, exp, allocation_status, onStatusChange, id, index}) => {
  const isFinished = allocation_status === "Finished";
  const rowBg = index % 2 === 0 ? "bg-gray-200" : "bg-white";

  return (
    <tr className={`border-b border-green-200 hover:bg-gray-100 ${rowBg}`}>
      <td className="py-3 px-6 text-center whitespace-nowrap">{no}</td>
      <td className="py-3 px-6 text-center">{items}</td>
      <td className="py-3 px-6 text-center">{price}</td>
      <td className="py-3 px-6 text-left">{exp}</td>
      <td className="py-3 px-6 text-center">
        <select
          value={allocation_status}
          onChange={(e) => onStatusChange(index, e.target.value)}
          disabled={isFinished}
          className={`py-1 px-3 rounded-full text-xs font-semibold
            ${isFinished ? "bg-green-300 text-green-800" : "bg-red-200 text-red-800"}
            focus:outline-none ${isFinished ? 'cursor-not-allowed' : ''}`}
        >
          {!isFinished && <option value={"Unfinished"}>{"Unfinished"}</option>}
          <option value={"Finished"} className='bg-teal-400'>{"Finished"}</option>
        </select>
      </td>
      <td>
        <Link to={`/eating/modify/${id}`} className="hover:text-amber-400">
            <Pencil/>
        </Link>
        </td>
              <td>
        <button className="hover:text-green-400">
            <Save/>
        </button>
        </td>
    </tr>
  );
};

export default  AllocationTableRow