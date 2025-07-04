import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Autentikasi/Login.jsx'
import Register from './pages/Autentikasi/Register.jsx'
import Task from './pages/Task/Task.jsx'
import AddTask from './pages/Task/insert/AddTask.jsx'
import Home from './pages/Home.jsx'
import ProtectedRoutes from './Context/protectedRoutes.jsx'
import ProviderAll from './Context/ProviderAll.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Deadline from './pages/deadline.jsx'
import Workout from './pages/Workout.jsx'
import Pomodoro from './pages/Pomodoro/Pomodoro.jsx'
import Allocation from './pages/Allocation.jsx'
import Eating from './pages/Eating/Eating.jsx'

const routes = createBrowserRouter([
  {path:'/login', element:<Login/>},
  {path:'/register', element:<Register/>},
  {path:"/", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Home/>}]},
  {path:"/profile", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Profile/>}]},
  {path:"/task", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Task/>}]},
  {path:"/task/insert", element:<ProtectedRoutes/>, children: [{ index: true, element:  <AddTask/>}]},
  {path:"/deadline", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Deadline/>}]},
  {path:"/workout", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Workout/>}]},
  {path:"/pomodoro", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Pomodoro/>}]},
  {path:"/allocation", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Allocation/>}]},
  {path:"/eating", element:<ProtectedRoutes/>, children: [{ index: true, element:  <Eating/>}]},
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
