import React, { useState } from 'react';
import Dashboard from "../../Components/Dashboard";
import LevelSection from "../../Components/LevelSection";
import { rawEatingData } from './dataEating';

const Eating = () => {
  const [eatingData, setEatingData] = useState(
    rawEatingData.map(item => ({ ...item, isDone: "Unfinished" }))
  );

  const handleStatusChange = (index, newStatus) => {
    setEatingData(prevData =>
      prevData.map((item, i) =>
        i === index && item.isDone === "Unfinished" && newStatus === "Finished"
          ? { ...item, isDone: newStatus }
          : item
      )
    );
  };

  const handleResetStatus = () => {
    setEatingData(
      rawEatingData.map(item => ({ ...item, isDone: "Unfinished" }))
    );
  };

  return (
    <div>
      <Dashboard>
        <LevelSection />
        <div className="mt-40 flex flex-col items-center">
          <div className="w-4/5 mb-4 flex justify-end">
            <button
              onClick={handleResetStatus}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Reset All to Unfinished (30-day cycle)
            </button>
          </div>
          <table className="min-w-4/5">
            <thead className="bg-secondary text-green-200 uppercase text-sm ">
              <tr>
                <th className="py-3 px-6 text-left">Day</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Price Desc.</th>
                <th className="py-3 px-3 text-left">EXP</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {eatingData.map((item, idx) => (
                <EatingTableRow
                  key={idx}
                  day={item.day}
                  items={item.items}
                  price={item.price}
                  descprice={item.description_price}
                  isDone={item.isDone}
                  index={idx}
                  exp={item.exp}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Dashboard>
    </div>
  );
};

const EatingTableRow = ({ day, items, price, descprice, isDone, index, exp, onStatusChange }) => {
  const isFinished = isDone === "Finished";
  const rowBgClass = index % 2 === 0 ? "bg-gray-200" : "bg-white";

  return (
    <tr className={`border-b border-green-200 hover:bg-gray-100 ${rowBgClass}`}>
      <td className="py-3 px-6 text-center whitespace-nowrap">{day}</td>
      <td className="py-3 px-6 text-center">{items}</td>
      <td className="py-3 px-6 text-center">{price}</td>
      <td className="py-3 px-6 text-left">{descprice}</td>
      <td className="py-3 px-6 text-left">{exp}</td>
      <td className="py-3 px-6 text-center">
        <select
          value={isDone}
          onChange={(e) => onStatusChange(index, e.target.value)}
          disabled={isFinished}
          className={`py-1 px-3 rounded-full text-xs font-semibold
            ${isFinished ? "bg-green-300 text-green-800" : "bg-red-200 text-red-800"}
            focus:outline-none ${isFinished ? 'cursor-not-allowed' : ''}`}
        >
          {!isFinished && <option value="Unfinished">Unfinished</option>}
          <option value="Finished">Finished</option>
        </select>
      </td>
    </tr>
  );
};

export default Eating;