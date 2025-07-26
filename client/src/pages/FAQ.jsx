import { useState } from 'react'
import Dashboard from '../Components/Dashboard'
import { ChevronDown, ChevronUp, MoveDown, MoveDownIcon } from 'lucide-react'

const FAQ = () => {
    const [open, setOpen] = useState(0)

    const info = [
        {id: 1, title:'Lorem Ipsum?' , desc:'lorem ipsum dolor sit amet'},
        {id: 2, title:'Lorem Ipsum Dolor?' , desc:'lorem ipsum dolor sit amet'},
        {id: 3, title:'Lorem Ipsum Dolor Sit Amet?' , desc:'lorem ipsum dolor sit amet'},
        {id: 4, title:'Lorem Ipsum Sit?' , desc:'lorem ipsum dolor sit amet'},
    ]

    function handleClick(id){
       if( open === id){
        return setOpen(0)
       } 
       return setOpen(id)
    }

  return (
    <div>
        <Dashboard>
            <section className='w-full h-full flex flex-col gap-y-8 justify-center items-center'>
                {info.map((item)=>(
                   <div key={item.id} className='flex justify-between px-4 formBG w-1/2 rounded-lg'>
                        <div className='p-4'>
                            <h1 className=' text-teal-300'>{item.title}</h1>
                            <h1 className={open === item.id? "h-auto text-green-300" :" h-0 overflow-hidden"}>{item.desc}</h1>
                        </div>
                        <button  onClick={()=>handleClick(item.id)} className='text-teal-300'>{open === item.id?  <ChevronUp />:<ChevronDown/>}</button>
                   </div> 
                ))}
            </section>        
        </Dashboard>
    </div>
  )
}

export default FAQ
