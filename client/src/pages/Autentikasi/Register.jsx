import { Link } from "react-router"
import Form from "../../Components/Form"
import { useState } from "react"




const Register = () => {
  const [form, setForm] = useState({name: "", password: ""})
  const [message, setMessage] = useState({pesan: "", tipe: ""})

async function handleSubmit(e) {
  e.preventDefault()
  setMessage({pesan: "", tipe: ""})

  try {
    const respon = await fetch('http://localhost:9000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
    });

    const hasil = await respon.json()
    console.log(hasil)

    if(respon.ok){
      setForm({name: " ", password: " "})
      setMessage({pesan: hasil.message, tipe: "success"})
    }else{
      setMessage({pesan: hasil.message, tipe: "failed"})
    }
  } catch (error) {
    setMessage({pesan: error, tipe: "failed"})
  }
}


  return (
   <div className='pavilionBG flex justify-center items-center h-screen w-screen p-4' id='autentikasiBG'>
      <Form submitting={handleSubmit}>
         <div className='flex flex-col justify-around h-full w-full p-10'>
          <section className=''>
              <h2 className='font-aldrich text-4xl flex justify-center'>Register</h2>
          </section>
          <section className='flex  flex-col gap-y-4'>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Username</label>
                <input 
                  type="text" 
                  className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white text-teal-900' 
                  value={form.name}
                  onChange={(e)=> {
                    setForm(restOf => ({...restOf, name: e.target.value}))
                  }}
                />
            </div>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Password</label>
                <input 
                  type="password" 
                  className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white' 
                  value={form.password}
                  onChange={(e)=> {
                    setForm(restOf => ({...restOf, password: e.target.value}))
                  }}
                />
            </div>
            <button className='font-aldrich bg-green-300 hover:bg-teal-200 hover:text-neutral-700 text-black  px-4 py-2 rounded-2xl w-full'>Register</button>
            <Link to={"/login"} className='text-green-200'>Already Have an Account? Sign In </Link>
          </section>
         </div>
      </Form>
      {!(message.pesan == "")&&!(message.tipe == "") && (
          <div className={`border  ${message.tipe =="success"? "bg-green-200 border-green-300": "bg-red-200 border-red-300"} px-8 py-4 rounded-lg text-sm absolute right-4 bottom-8 shadow-lg text-blue-950`}>
            <p className="flex justify-center">{message.pesan}</p>
          </div>
        )}
    </div>
  )
}

export default Register
