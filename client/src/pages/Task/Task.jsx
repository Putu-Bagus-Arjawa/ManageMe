import { Link } from "react-router" // Mengganti 'react-router' ke 'react-router-dom'
import Dashboard from "../../Components/Dashboard"
import { useEffect, useState } from "react"
import LevelSection from "../../Components/LevelSection"
import { useUserContext } from "../../Context/UserContext"
import { CirclePlus } from "lucide-react"
import Loading from "../../Components/Loading"

const Task = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const {refreshUser} = useUserContext()

    const loadTasks = async () => {
        try {
            const res = await fetch("http://localhost:9000/task/", {
                credentials: "include",
            })
            const data = await res.json()

            console.log("Tasks response:", data) 
            if (res.ok && data && Array.isArray(data.task)) { 
                setTasks(data.task) 
            } else {
                console.warn("Respons API task tidak sesuai format yang diharapkan:", data)
                setTasks([]) 
            }

            setLoading(false)
        } catch (error) {
            console.error("Gagal ambil task:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTasks()
    }, [])

    const handleFinishTask = async (taskId) => {

        try {
            const res = await fetch(`http://localhost:9000/task/finish/${taskId}`, {
                method: "POST",
                credentials: "include",
            })

            const responseData = await res.json() 

            console.log("Finish Task response:", responseData)

            if (res.ok) {

                const taskName = responseData.message ? responseData.message.split('"')[1] : "Tugas"; 
                const expGain = responseData.task ? responseData.task.exp : '??'; 
                const userLevel = responseData.user ? responseData.user.level : '??'; 

                let alertMessage = `✅ Tugas "${taskName}" selesai!\n`;
                if (expGain !== '??') alertMessage += `EXP +${expGain}\n`;
                if (userLevel !== '??') alertMessage += `Level sekarang: ${userLevel}\n`;
                if (responseData.leveledUp) alertMessage += `${responseData.levelUpMessage}\n`;

                alert(alertMessage);

                setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));

                 refreshUser()
            } else {
                alert(responseData.error || "❌ Gagal menyelesaikan task.");
            }
        } catch (err) {
            console.error("❌ Error saat menyelesaikan task:", err)
            alert("Gagal menyelesaikan task.")
        }
    }

    if (loading) return <Loading/>

    return (
        <div>
            <Dashboard>
              <LevelSection/>
                <div className="mt-40 flex flex-col items-center">
                    <section className="flex w-full justify-around">
                        <h2 className="flex justify-center text-2xl font-semibold tracking-wide font-mono mb-10">Tasks</h2>
                        <Link
                            to={"/task/insert"}
                            className="px-4 py-2 rounded-4xl  text-secondary hover:text-triary text-6xl"
                        >
                        <CirclePlus/>
                    </Link>
                    </section>

                    <section className=" w-full grid grid-cols-1 place-items-center lg:grid-cols-2 gap-8 mb-8">
                        {tasks.length === 0 ? (
                            <p className="text-gray-500 col-span-full">Tidak ada task. 🎉</p>
                        ) : (
                            tasks.map((item) => (
                                <TaskCard 
                                    taskName={item.nama_task} 
                                    expCompletion={item.exp}
                                    handleClick={()=> handleFinishTask(item.id)}
                                />
                            ))
                        )}
                    </section>
                </div>
            </Dashboard>
            {console.log(tasks)}
        </div>
    )
}

const TaskCard = ({taskName, expCompletion, id, handleClick})=>{
    return(
        <div
            className="pavilionBG relative shadow-xl rounded-xl w-4/5 min-h-60 flex flex-col justify-between px-4 py-6 bg-white"
        >
            <div className="bg-gray-300 w-6 h-6 rounded-full absolute top-2 right-2">
                <div className="bg-gray-950 w-6 h-6 rounded-full absolute top-2 right-2"></div>
            </div>                            


            <div className="flex flex-col items-center text-center p-4">
                <h3 className="text-lg font-bold">{taskName}</h3>
                <p className="text-sm text-gray-600">Ki Gained: </p>  
                <p className="text-sm text-gray-600"> {expCompletion} points</p>
            </div>

            <button
                onClick={()=> handleClick(id)}
                className="rounded-2xl bg-amber-600 text-white px-4 py-2 hover:bg-green-700 transition duration-150"
            >
                Finish
            </button>
        </div>                              
    )
}

export default Task