import Sidebar from "./Sidebar"
import { useUserContext } from "../Context/UserContext"
import logo from "../assets/beaches.png"



const Dashboard = ({children}) => {
      const {user, loading} =  useUserContext()
  
      if(loading) return <div>loading....</div>

  return (
    <div className="flex min-h-screen w-screen bg-[#F6F6F6]">
        <div>
                <Sidebar imageUrl={logo} username={user.name}/>
        </div>
        <div className="w-screen min-h-screen p-4">
            {children}
        </div>
    </div>
  )

}

export default Dashboard
