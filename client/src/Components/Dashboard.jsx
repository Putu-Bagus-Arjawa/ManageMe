import Sidebar from "./Sidebar"



const Dashboard = ({children}) => {


  return (
    <div className="pavilionBG flex min-h-screen w-screen bg-[#F6F6F6]">
        <div>
          <Sidebar/>
        </div>
        <div className="w-screen min-h-screen p-4 ml-64">
            {children}
        </div>
    </div>
  )

}

export default Dashboard
