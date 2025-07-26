import { useState } from 'react';
import Dashboard from "../../Components/Dashboard";
import LevelSection from "../../Components/LevelSection";
import EatingTableRow from './EatingTableRow';
import { useEffect } from 'react';
import Loading from '../../Components/Loading';

const Eating = () => {
  const [eating, setEating] = useState([])
  const [loadEating, setLoadEating] = useState(true)


  const fetchEating = async ()=>{
    try {
      const res = await fetch("http://localhost:9000/eating/", {credentials:"include"})
      const data = await res.json()
      if(res.ok){
        setEating(data)
      }
    } catch (error) {
      console.error("Gagal ambil task:", error)
    }finally{
      setLoadEating(false)
    }
  }

  useEffect(()=>{
    fetchEating()
  }, [])


  if (loadEating) return <Loading/>

  const handleStatusChange = (day, newStatus) => {
    setEating(prevData =>
      prevData.map((item, i) =>
        i === day && item.eating_status === "Unfinished" && newStatus === "Finished"
          ? { ...item, eating_status: newStatus }
          : item
      )
    );
  };


 const handleReset =  async (e)=>{
      e.preventDefault();
     try {
      const res = await fetch(`http://localhost:9000/eating/reset`, {
        method: "PUT",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      fetchEating()


      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal update status");
      }
    } catch (err) {
      console.error("Error update status:", err.message);
      alert("Gagal mengubah status!");
    }

 }

  return (
    <div>
      <Dashboard>
        <LevelSection />
        <div className="mt-40 flex flex-col items-center">
          <div className="w-4/5 mb-4 flex justify-between">
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
                {["Day", "Items", "Price", "Gizi", "EXP", "Status", "Edit"].map((item)=>(
                  <th className="py-3 px-6 text-left">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {eating.map((item) => (
                <EatingTableRow
                  key={item.day}
                  day={item.day}
                  items={item.items}
                  price={item.price}
                  descprice={item.gizi}
                  isDone={item.eating_status}
                  exp={item.eating_exp}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
        {console.log(eating)}
      </Dashboard>
    </div>
  );
};



export default Eating;