import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";
import Loading from "../Components/Loading";

const ProtectedRoutes = () => {
     const auth = useAuth();
    const {user, loading} = auth
    
    if (loading) return <Loading/>;
    if(!user)  return <Navigate to="/login" replace />;
    
    return <Outlet/>
}

export default ProtectedRoutes
