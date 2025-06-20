import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

const routes = createBrowserRouter([
  {path:'/', element:<App/>},
  {path:'/login', element:<Login/>},
  {path:'/register', element:<Register/>},
  {path:'/user', element:<Dashboard/>},
  {path:'*', element:<NotFound/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
