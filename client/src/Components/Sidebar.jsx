import { Link, useNavigate } from 'react-router'
import { useUserContext } from '../Context/UserContext'
import { useAuth } from '../Context/AuthContext'

const Sidebar = () => {
  const { user, loading } = useUserContext()
  const {logout}  = useAuth()
  const navigate = useNavigate()

  const handleLogout = async ()=>{
     const result = await logout()
     if(result)  navigate('/')
  }

  if (loading) return <div className="text-white text-center">Loading...</div>

  return (
    <section className='shadow-lg shadow-cyan-900 bg-linear-to-tr from-triary via-primary to-secondary h-[200vh] px-8 w-68 text-green-200 rounded-2xl'>
      <div className='flex justify-center flex-col items-center py-8 '>
        <img
              src={(user.avatar && `http://localhost:9000${user.avatar}?t=${Date.now()}`) || "/default-avatar.png"}

              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8D6E6E] shadow-md"
            />
        <p className='font-insan text-[18px]'>{user.name}</p>
      </div>
      <div className='flex flex-col'>
        {[
          { name: "Home", url: "/" },
          { name: "Task", url: "/task" },
          { name: "Deadline", url: "/deadline" },
          { name: "Workout", url: "/workout" },
          { name: "Eating", url: "/eating" },
          { name: "Allocation", url: "/allocation" },
          { name: "Pomodoro", url: "/pomodoro" },
          { name: "My Profile", url: "/profile" },
        ].map((item, index) => (
          <Link
            to={item.url}
            key={index}
            onClick={item.name == "Logout" && handleLogout}
            className="hover:bg-teal-500 font-insan mb-6 hover:text-black px-3 py-2 hover:border-x-4 text-center border-teal-700 rounded-2xl"
          >
            {item.name}
          </Link>
        ))}
         <button
          onClick={handleLogout}
          className="hover:bg-red-500 font-insan mb-6 hover:text-black px-3 py-2 hover:border-x-4 text-center border-red-700 rounded-2xl"
        >Logout</button>
      </div>
    </section>
  )
}

export default Sidebar
