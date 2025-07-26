import Dashboard from '../../Components/Dashboard'
import LevelSection from '../../Components/LevelSection'
import AllocationTableRow from './AllocationsTable'

const Allocation = () => {
    const eatingData = [
  {
    day: 1,
    items: "telur, cumi, tempe",
    price: 19,
    isDone: "Finished",
    exp: 100, 
  },
  {
    day: 2,
    items: "telur, cumi, tempe",
    price: 19,
    isDone: "Unfinished",
    exp: 50,
  }]
  return (
    <div>
      <Dashboard>
            <LevelSection/>
        <div className="mt-40  flex justify-center"> 
          <table className="min-w-4/5">
            <thead className="bg-secondary text-green-200 uppercase text-sm ">
              <tr>
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">EXP</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-left">Edit</th>
                <th className="py-3 px-6 text-center">Save</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {eatingData.map((item, idx) => (
                <AllocationTableRow
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

export default Allocation
