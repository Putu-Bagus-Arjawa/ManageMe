import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Autentikasi/Login.jsx'
import Register from './pages/Autentikasi/Register.jsx'
import Task from './pages/Task/Task.jsx'
import Home from './pages/Home.jsx'
import ProtectedRoutes from './Context/protectedRoutes.jsx'
import ProviderAll from './Context/ProviderAll.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Workout from './pages/Workout.jsx'
import Pomodoro from './pages/Pomodoro/Pomodoro.jsx'
import Allocation from './pages/Allocations/Allocation.jsx'
import Eating from './pages/Eating/Eating.jsx'
import PomodoroWorker from './pages/Pomodoro/PomodoroWorker.jsx'
import ModifyEating from './pages/Eating/ModifyEating.jsx'
import AddTask from './pages/Task/AddTask.jsx'
import FAQ from './pages/FAQ.jsx'
import Deadline from './pages/Deadline.jsx'
import EatingStatus from './pages/Eating/EatingStatus.jsx'

const routes = createBrowserRouter([
  {path:'/login', element:<Login/>},
  {path:'/register', element:<Register/>},
  {path:"/", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Home/>}]},
  {path:"/profile", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Profile/>}]},
  {path:"/task", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Task/>}]},
  {path:"/task/insert", element:<ProtectedRoutes/>, children: [{ index: true, element:  <AddTask/>}]},
  {path:"/deadline", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Deadline/>}]},
  {path:"/workout", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Workout/>}]},
  {
    path: "/pomodoro",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <Pomodoro />,
      },
      {
        path: ":start/:end",
        element: <PomodoroWorker />,
      },
    ],
  },
  {path:"/faq", element:<ProtectedRoutes/>, children: [{ index: true, element:  <FAQ/>}]},
  {path:"/allocation", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Allocation/>}]},
  {path:"/eating", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Eating/>}]},
  {path:"/eating/modify/:day", element:<ProtectedRoutes/>, children: [{ index: true, element:  <ModifyEating/>}]},
    {path:"/eating/status/:day", element:<ProtectedRoutes/>, children: [{ index: true, element:  <EatingStatus/>}]},

  {path:'*', element:<NotFound/>}
])



createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ProviderAll>
         <RouterProvider router={routes} />
      </ProviderAll>
    </StrictMode>
,       
)
