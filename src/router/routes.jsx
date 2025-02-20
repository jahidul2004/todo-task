import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import WorkArea from "../pages/workArea/WorkArea";

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
    },
    {
        path:"/workArea",
        element: <WorkArea></WorkArea>
    }
]);

export default router;