import LevelSection from "../Components/LevelSection"
import Dashboard from "../Components/Dashboard"

const Deadline = () => {
    const data = [
        {
            title: "Tugas 1", 
            description:"lorem ipsum dolor sit amet, esp",
            due: "1/2/27", 
            label: "Urgent",
            weight : "Difficult",
            consequence: "You can't imagine"
        },
            {
            title: "Tugas 2", 
            description:"lorem ipsum dolor sit amet, esp",
            due: "30/4/30", 
            label: "Turu",
            weight : "Easy",
            consequence: "medium"
        },
         {
            title: "Tugas 3", 
            description:"lorem ipsum dolor sit amet, esp",
            due: "1/2/27", 
            label: "Urgent",
            weight : "Difficult",
            consequence: "You can't imagine"
        },
            {
            title: "Tugas 4", 
            description:"lorem ipsum dolor sit amet, esp",
            due: "30/4/30", 
            label: "Turu",
            weight : "Easy",
            consequence: "medium"
        },
    ]
  return (
    <Dashboard>
        <LevelSection/>
      <p>Halaman deadline ni boss</p>
      <div className="mt-40 grid grid-cols-1 gap-4">
      {data.map((item, idx)=>(
        <DeadlineCard 
            key={idx}
            title={item.title} 
            description={item.description}
            due={item.due}
            label={item.label}
            weight={item.weight}
            consequence={item.consequence}
        />
      ))}
      </div>
    </Dashboard>
  )
}

export default Deadline

const DeadlineCard = ({title, description,due,label, weight,consequence  })=>{
    return (
        <aside className="shadow-xl px-4 py-4 flex justify-between h-50">
            <section className="border-r-[1px] px-12 flex flex-col justify-between">
                <div className="flex flex-col">
                    <h3 className="font-semibold font-aldrich mb-4 text-center">{title}</h3>
                    <div className="flex gap-x-4">
                        <p className="font-aldrich border-teal-700 border-2 px-2 py-1 rounded-2xl bg-green-300">{label}</p>
                        <p className="font-aldrich flex justify-center items-center border-amber-700 border-[1px] px-2 py-[1px] text-[14px] rounded-2xl bg-red-300">{weight}</p>
                    </div>
                </div>
                <p className="text-primary font-insan">Deadline : {due}</p>
            </section>
            <section className="flex flex-col justify-between px-1">
                <p className="font-insan">{description}</p>
                <div>
                    <p className="font-aldrich justify-center flex text-primary">{consequence}</p>
                    <div className="flex gap-x-4">
                        <button className="px-2 py-1 bg-primary text-red-300 rounded-2xl hover:bg-triary">Unfinished</button>
                        <button className="px-2 py-1 bg-primary text-teal-300 rounded-2xl hover:bg-triary">Completed</button>
                    </div>
                </div>
            </section>
        </aside>
    )
}