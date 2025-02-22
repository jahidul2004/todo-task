import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-[#357ef0] mx-auto"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }
    return <Navigate to="/register" replace={true}></Navigate>;
};

export default PrivateRoute;
