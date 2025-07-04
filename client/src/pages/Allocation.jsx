import React from 'react'
import Dashboard from '../Components/Dashboard'
import LevelSection from '../Components/LevelSection'

const Allocation = () => {
    const eatingData = [
  {
    day: 1,
    items: "telur, cumi, tempe",
    price: 19,
    isDone: "Finished",
    exp: 100, // Added exp
  },
  {
    day: 2,
    items: "telur, cumi, tempe",
    price: 19,
    isDone: "Unfinished",
    exp: 50, // Added exp
  },]
  return (
    <div>
      <Dashboard>
            <LevelSection/>
        <div className="mt-40  flex justify-center"> 
          <table className="min-w-4/5">
            <thead className="bg-secondary text-green-200 uppercase text-sm ">
              <tr>
                <th className="py-3 px-6 text-left">Day</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-3 text-left">EXP</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {eatingData.map((item, idx) => (
                <AllocationRow
                  key={idx}
                  day={item.day}
                  items={item.items}
                  price={item.price}
                  isDone={item.isDone}
                  index={idx} 
                  exp={item.exp}
                />
              ))}
            </tbody>
          </table>
        </div>
        </Dashboard>
    </div>
  )
}

const AllocationRow = ({ day, items, price, isDone, index, exp }) => {
  const isFinished = isDone === "Finished";
  const rowBgClass = index % 2 === 0 ? "bg-gray-50" : "bg-white"; 
  const statusBgClass = isFinished ? "bg-green-300 text-green-800" : "bg-red-200 text-red-800"; // 

  return (
    <tr className={`border-b border-green-200 hover:bg-gray-100 ${rowBgClass}`}>
      <td className="py-3 px-6 text-center whitespace-nowrap">{day}</td>
      <td className="py-3 px-6 text-center">{items}</td>
      <td className="py-3 px-6 text-center">{price}</td>
      <td className="py-3 px-6 text-left">{exp}</td>
      <td className="py-3 px-6 text-center">
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${statusBgClass}`}>
          {isDone}
        </span>
      </td>
    </tr>
  );
};

export default Allocation
