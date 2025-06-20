import { Link } from "react-router"
import AuthForm from "../Components/AuthForm"

const Register = () => {
  return (
   <div className='flex justify-center items-center h-screen w-screen' id='autentikasiBG'>
      <AuthForm>
         <div className='flex flex-col justify-around h-full w-full'>
          <section className=''>
              <h2 className='font-aldrich text-4xl flex justify-center'>Register</h2>
          </section>
          <section className='flex  flex-col gap-y-4'>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Username</label>
                <input type="text" className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white' />
            </div>
            <div className='flex flex-col'>
                <label className='font-aldrich'>Password</label>
                <input type="password" className='focus:outline-none border-[0.5px] p-1 rounded-lg bg-white' />
            </div>
            <button className='font-aldrich bg-[#633333] text-white px-4 py-2 rounded-2xl w-full'>Register</button>
            <Link to={"/login"} className='text-[#8D6E6E]'>Already Have an Account? Sign In </Link>
          </section>
         </div>
      </AuthForm>
    </div>
  )
}

export default Register
