
import { useEffect, useState } from "react"
import Sidebar from "../Components/Sidebar"
import beach from "../assets/beaches.png"
const Dashboard = () => {
    const [label, setLabel] = useState("")
    const data = [
        {
            username: "Arjawa Bagus", 
            pp: beach, 
            level: 120, 
            current_exp: 150000,
            registration_date: '2024-01-15'
        },
    ]

    const EXP_LEVEL_THRESHOLDS = [
    { level: 121, exp_required: 300000 },
    { level: 122, exp_required: 323000 }
    ];
    const LEVEL_LABELS = [
    { label_name: 'Trascedence', min_level: 98, max_level: 122 },
    { label_name: 'Sovereign', min_level: 123, max_level: 160 }
    ];

    const handleLabelChanges = ()=>{
        data.map((it)=>{
            LEVEL_LABELS.map((data)=>{
                if(it.level > data.min_level && it.level <= data.max_level ){
                    setLabel(data.label_name)
                }
            })
    })
}

useEffect(()=>{
handleLabelChanges()
}, [])

  return (
    <div className="flex min-h-screen w-screen">
        <div>
            {data.map((it, i) =>(
                <Sidebar imageUrl={it.pp} key={i} username={it.username}/>
            ))}
        </div>
        <div className="w-full p-4">
            <h2 className="flex justify-end font-aldrich text-2xl mb-14">ManageMe</h2>
                {data.map((item, i)=>(
                    <section className="flex justify-between">
                        <p className="font-aldrich">Welcome, <span key={i}>{item.username.slice(0, item.username.indexOf(" "))}</span> </p>
                        <div >
                            <div className="flex gap-x-4">
                                <p className="font-aldrich">Level {item.level}</p>
                                <span className="font-aldrich">{label}</span>
                            </div>
                            <div>
                                <p className="font-aldrich">Exp {item.current_exp} / {EXP_LEVEL_THRESHOLDS.find(treshold => treshold.level === item.level + 1).exp_required ?? "Max"}</p>
                            </div>
                        </div>
                    </section>
                ))}

        </div>
    </div>
  )

}

export default Dashboard
