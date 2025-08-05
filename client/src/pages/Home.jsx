import LevelSection from '../Components/LevelSection'
import Dashboard from '../Components/Dashboard'
import { useUserContext } from '../Context/UserContext'
import Loading from '../Components/Loading';
import { useAuth } from '../Context/AuthContext';
import { useLevelTresholdContext } from '../Context/LevelTresholdContext';
import { Link } from 'react-router';




const Home = () => {

    const {user, loading} =  useUserContext()
    const {loading: authLoading} =  useAuth()
    const {loadingTreshold} = useLevelTresholdContext()


    if(loading && authLoading && loadingTreshold) return <Loading/>



    return (
        <section className=''>
            <Dashboard >
                <LevelSection/>
                <div className='mt-40 h-full flex flex-col '>
                    <h2 className='text-2xl font-aldrich'>
                            Welcome, {user? user?.name.split(" ")[0]: "Tamu"}
                    </h2>
                    <p className='text-triary'>Manage you daily life, increase productivity and enhance life</p>
                </div>
            
            </Dashboard>
                  {console.log(user)}
        </section>
    );
};


export default Home