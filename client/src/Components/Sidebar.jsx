import { Link, useNavigate } from 'react-router'
import { useUserContext } from '../Context/UserContext'
import { useAuth } from '../Context/AuthContext'
import Loading from './Loading'
import logo from "../assets/react.svg"

const Sidebar = () => {
  const { user, loading } = useUserContext()
  const {logout}  = useAuth()
  const navigate = useNavigate()

  const handleLogout = async ()=>{
     const result = await logout()
     if(result)  navigate('/')
  }

  if (loading) return <Loading/>

  return (
    <section className='h-screen fixed px-8 w-64 text-green-200 p-4 bg-linear-to-bl from-indigo-500 via-fuchsia-400 to-violet-500 '>
      <div className='flex justify-between'>
          <img src={logo} alt="" />
          <p className='font-aldrich'>Manage Me</p>
      </div>
      <div className='flex justify-center flex-col items-center py-8 '>
        <img
              src={(user.avatar && `http://localhost:9000${user.avatar}?t=${Date.now()}`) || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8D6E6E] shadow-md"
              onClick={()=> navigate("/profile")}
            />
        <p className='font-aldrich text-[18px]'>{user.name}</p>
      </div>
      <div className='flex flex-col'>
        {[
          { name: "Home", url: "/" },
          { name: "Task", url: "/task" },
          { name: "Eating", url: "/eating" },
          { name: "Allocation", url: "/allocation" },
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
