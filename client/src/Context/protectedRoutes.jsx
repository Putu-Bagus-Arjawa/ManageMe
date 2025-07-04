import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {

    const {user, loading} = useAuth()
    
    if (loading) return <div>Loading...</div>;
    if(!user)  return <Navigate to="/login" replace />;
    return <Outlet/>
}

export default ProtectedRoutes
