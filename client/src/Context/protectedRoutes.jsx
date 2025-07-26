import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {
     const auth = useAuth();
    const {user, loading} = auth
    
    if (loading) return <div>Loading...</div>;
    if(!user)  return <Navigate to="/login" replace />;
    
    return <Outlet/>
}

export default ProtectedRoutes
