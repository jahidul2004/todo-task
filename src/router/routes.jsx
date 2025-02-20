import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path:"/register",
        element: <Register></Register>
    },
    {
        path:"/login",
        element: <Login></Login>
    }
]);

export default router;