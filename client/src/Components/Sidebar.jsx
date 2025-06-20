import { NavLink } from 'react-router'

const Sidebar = ({username, imageUrl}) => {
    const items = ["Home", "Task", "Deadline", "Workout", "Eating", "Allocation", "Pomodoro"]
  return (
    <section className='bg-primary h-screen px-8 w-68'>
        <div className='flex justify-center flex-col items-center py-8 '>
            <img src={imageUrl} alt="" className='w-28 h-28 rounded-full shadow-2xl' />
            <p className='font-insan text-[18px]'>{username}</p>
        </div>
        <div className='flex flex-col'>
            {items.map((item, index)=>(
                <NavLink to={""} key={index} className="font-insan mb-6">{item}</NavLink>
            ))}
        </div>
    </section>
  )
}

export default Sidebar
