import { Link, useNavigate } from 'react-router'
import Form from '../../Components/Form'
import { useAuth } from '../../Context/AuthContext';
import { useState } from 'react';
import Loading from '../../Components/Loading';
import { useUserContext } from '../../Context/UserContext';
import { useLevelTresholdContext } from '../../Context/LevelTresholdContext';
import { useLevelLabelContext } from '../../Context/LevelLabelContext';



const Login = () => {
  const navigate = useNavigate()
  const {loading,verify} = useAuth()
  const { refreshUser } = useUserContext(); 
  const {fetchTreshold} = useLevelTresholdContext()
  const {fetchLabels} = useLevelLabelContext()


  const [form, setForm] = useState({
          name: "",
          password: "",
      })
  
    const [message, setMessage] = useState({pesan:"", tipe: ""});

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const respons = await fetch('http://localhost:9000/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(form)
      });

      const data = await respons.json()
      console.log(respons)
      
      if(respons.ok){
            await verify()
            await refreshUser();   
            await fetchTreshold();
            await fetchLabels();
            setTimeout(() => {
              return navigate(data.urlnya)
            }, 200); 


            setForm({
                name:"",
                password: "",
            });
            setMessage({pesan: data.message, tipe: "success"})

      }else{
           setMessage({pesan: data.message, tipe:"failed"})
      }

    } catch (error) {
      setMessage({pesan: error, tipe: "failed"})
    }
  }
  
  if(loading) return <Loading/>
  return (
    <div className='pavilionBG flex justify-center items-center h-screen w-screen' id='autentikasiBG'>
      <Form submitting={handleSubmit}>
         <div className='flex flex-col justify-around h-full w-full p-10'>
          <section className=''>
              <h2 className='font-aldrich text-4xl flex justify-center'>Login</h2>
          </section>
          <section className='flex  flex-col gap-y-4'>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Username</label>
                <input 
                  type="text" 
                  className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white text-teal-900' 
                  value={form.name}
                  onChange={(e)=>{
                    setForm(restOf=> ({...restOf, name: e.target.value}))
                    if(message.pesan) setMessage({ pesan: "", tipe: "" });
                  }}
                />
            </div>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Password</label>
                <input 
                  type="password" 
                  className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white text-teal-900' 
                  value={form.password}
                  onChange={(e)=>{
                    setForm(restOf=> ({...restOf, password: e.target.value}))
                    if(message.pesan) setMessage({ message: "", tipe: "" });
                  }}
                />
            </div>
            <button  type='submit' className='font-aldrich bg-green-300 hover:bg-teal-200 hover:text-neutral-700 text-black  px-4 py-2 rounded-2xl w-full'>Login</button>
            <Link to={'/register'} className='text-green-200'>Don’t Have an Account? Sign Up </Link>
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

export default Login
