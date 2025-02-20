import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center">

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Welcome to Modern ToDo System
            </h1>

            <Link to={"/register"} className="btn mt-5 bg-gradient-to-tl from-[#ffffff] border-none shadow-none text-[#ff6867]">Get Started</Link>
        </div>
    );
};

export default Home;