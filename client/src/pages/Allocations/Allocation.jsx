import { useEffect, useState } from 'react'
import Dashboard from '../../Components/Dashboard'
import LevelSection from '../../Components/LevelSection'
import AllocationTableRow from './AllocationsTable'
import Loading from '../../Components/Loading'

const Allocation = () => {
  const [allocation, setAllocation]= useState([])
  const [loadAllo, setLoadAllo] = useState(true)
  
  const fetchAllocation = async ()=>{
      try {
        const res = await fetch("http://localhost:9000/allocation/", {credentials:"include"})
        const data = await res.json()
        if(res.ok){
          setAllocation(data)
        }
      } catch (error) {
        console.error("Gagal ambil task:", error)
      }finally{
        setLoadAllo(false)
      }
    }
  
    useEffect(()=>{
      fetchAllocation()
    }, [])

     const handleReset =  async (e)=>{
      e.preventDefault();
     try {
      const res = await fetch(`http://localhost:9000/allocation/reset`, {
        method: "PUT",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      fetchAllocation()


      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal update status");
      }
    } catch (err) {
      console.error("Error update status:", err.message);
      alert("Gagal mengubah status!");
    }

 }

    if(loadAllo) return <Loading/>

  return (
    <div>
      <Dashboard>
            <LevelSection/>
        <div className="mt-40 flex flex-col gap-y-8 items-center"> 
          <div className='w-4/5 mb-4 flex justify-between'>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
              Reset All to Unfinished (30-day cycle)
            </button>
          </div>
          <table className="min-w-4/5">
            <thead className="bg-secondary text-green-200 uppercase text-sm ">
              <tr>
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">EXP</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-left">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {allocation.map((item) => (
                <AllocationTableRow
                  key={item.allocation_day}
                  day={item.allocation_day}
                  items={item.items}
                  price={item.price}
                  allocation_status={item.allocation_status }
                  index={item.allocation_day} 
                  exp={item.allocation_exp }
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
