import React from 'react'
import Dashboard from '../../Components/Dashboard'
import LevelSection from '../../Components/LevelSection'

const Pomodoro = () => {
    const time  = ["50:10", "45:15", "25:5"]
  return (
    <div>
        <Dashboard>
            <LevelSection/>
                  <section className='mt-40  grid grid-cols-3 gap-x-4'>
                        {time.map((item, idx)=>(
                            <PomodoroCard key={idx} time={item}/>
                        ))}
                  </section>
        </Dashboard>

    </div>
  )
}

const PomodoroCard = ({time})=>{
    return(
        <div className='shadow-lg w-4/5 h-50 flex justify-center items-center hover:bg-primary'>
            <h2 className='text-4xl '>{time}</h2>
        </div>
    )
}

export default Pomodoro
