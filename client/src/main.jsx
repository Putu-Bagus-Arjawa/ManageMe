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
import Pomodoro from './pages/Pomodoro/Pomodoro.jsx'
import Allocation from './pages/Allocations/Allocation.jsx'
import Eating from './pages/Eating/Eating.jsx'
import PomodoroWorker from './pages/Pomodoro/PomodoroWorker.jsx'
import ModifyEating from './pages/Eating/ModifyEating.jsx'
import AddTask from './pages/Task/AddTask.jsx'
import FAQ from './pages/FAQ.jsx'
import EatingStatus from './pages/Eating/EatingStatus.jsx'
import AllocationModify from './pages/Allocations/AllocationModify.jsx'
import AllocationStatus from './pages/Allocations/AllocationStatus.jsx'

const routes = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
      { path: 'task', element: <Task /> },
      { path: 'task/insert', element: <AddTask /> },
      {
        path: 'pomodoro',
        children: [
          { index: true, element: <Pomodoro /> },
          { path: ':start/:end', element: <PomodoroWorker /> },
        ],
      },
      { path: 'faq', element: <FAQ /> },
      { path: 'allocation', element: <Allocation /> },
      { path: 'allocation/modify/:day', element: <AllocationModify /> },
      { path: 'allocation/status/:day', element: <AllocationStatus /> },
      { path: 'eating', element: <Eating /> },
      { path: 'eating/modify/:day', element: <ModifyEating /> },
      { path: 'eating/status/:day', element: <EatingStatus /> },
    ],
  },

  { path: '*', element: <NotFound /> },
]);




createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ProviderAll>
         <RouterProvider router={routes} />
      </ProviderAll>
    </StrictMode>
,       
)
