import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import WorkArea from "../pages/workArea/WorkArea";
import PrivateRoute from "./PrivateRoute";
import LoginRegisterProtect from "./LoginRegisterProtect";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/register",
        element: (
            <LoginRegisterProtect>
                <Register></Register>
            </LoginRegisterProtect>
        ),
    },
    {
        path: "/login",
        element: (
            <LoginRegisterProtect>
                <Login></Login>
            </LoginRegisterProtect>
        ),
    },
    {
        path: "/workArea",
        element: (
            <PrivateRoute>
                <WorkArea></WorkArea>
            </PrivateRoute>
        ),
    },
]);

export default router;
