import Dashboard from '../Components/Dashboard'
import LevelSection from '../Components/LevelSection'

const Workout = () => {
  const workoutData = [
  { day: 1, exercise: "Barbel", exp: 390 },
  { day: 2, exercise: "Kardio", exp: 490 },
  { day: 3, exercise: "Rest", exp: 390 },
  { day: 4, exercise: "Kardio", exp: 490 },
  { day: 5, exercise: "Barbel", exp: 390 },
  { day: 6, exercise: "Rest", exp: 490 },
  { day: 7, exercise: "Barbel", exp: 390 },
  { day: 8, exercise: "Barbel", exp: 390 },
  { day: 9, exercise: "Kardio", exp: 490 },
  { day: 10, exercise: "Rest", exp: 390 },
    { day: 1, exercise: "Barbel", exp: 390 },
  { day: 2, exercise: "Kardio", exp: 490 },
  { day: 3, exercise: "Rest", exp: 390 },
  { day: 4, exercise: "Kardio", exp: 490 },
  { day: 5, exercise: "Barbel", exp: 390 },
  { day: 6, exercise: "Rest", exp: 490 },
  { day: 7, exercise: "Barbel", exp: 390 },
  { day: 8, exercise: "Barbel", exp: 390 },
  { day: 9, exercise: "Kardio", exp: 490 },
  { day: 10, exercise: "Rest", exp: 390 },
    { day: 1, exercise: "Barbel", exp: 390 },
  { day: 2, exercise: "Kardio", exp: 490 },
  { day: 3, exercise: "Rest", exp: 390 },
  { day: 4, exercise: "Kardio", exp: 490 },
  { day: 5, exercise: "Barbel", exp: 390 },
  { day: 6, exercise: "Rest", exp: 490 },
  { day: 7, exercise: "Barbel", exp: 390 },
  { day: 8, exercise: "Barbel", exp: 390 },
  { day: 9, exercise: "Kardio", exp: 490 },
  { day: 10, exercise: "Rest", exp: 390 },

];
  return (
    <div>
      <Dashboard>
        <LevelSection/>
        <div className='mt-40  flex justify-center'>
          <table className='w-4/5 text-center'>
            <tr>
              {["Hari ke-", "Olahraga", "Exp", "Completion"].map((item)=>(
                <th className='font-insan'>{item}</th>
              ))}
            </tr>
            {workoutData.map((item, i)=>(
              <tr key={i}>
                <td className='py-2'>{item.day}</td>
                <td className='py-2'>{item.exercise}</td>
                <td className='py-2'>{item.exp}</td>
                <td ><p className={` ${i % 3 == 0? "bg-red-500":"bg-[#91ff76]"} text-white font-aldrich font-semibold border-[1px] border-black rounded-2xl px-2 py-1`}>{i % 3 == 0? "Unfinished": "Finished"}</p></td>
              </tr>
            ))}

          </table>
        </div>
      </Dashboard>
    </div>
  )
}

export default Workout
