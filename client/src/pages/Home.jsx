import LevelSection from '../Components/LevelSection'
import Dashboard from '../Components/Dashboard'
import { useUserContext } from '../Context/UserContext'
import Loading from '../Components/Loading';




const Home = () => {

    const {user, loading} =  useUserContext()

    if(loading) return <Loading/>


    return (
        <section className=''>
            <Dashboard >
                <LevelSection/>
                <div className='mt-40 '>
                    <h2 className='text-2xl font-aldrich'>
                            Welcome, {user !== null && user.name.split(" ")[0]}
                    </h2>
                </div>
            
            </Dashboard>
                  {console.log(user)}
        </section>
    );
};


export default Home