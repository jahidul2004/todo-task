import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const Register = () => {
    const { setUser, googleLogin } = useAuth();

    const handleGoogleLogin = async () => {
        googleLogin()
            .then((result) => {
                setUser(result.user);

                const { displayName, email, photoURL } = result.user;
                const newUser = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    LoginTime: new Date().toLocaleString(),
                };

                axios
                    .post("http://localhost:3000/user", newUser)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-xl font-bold text-[#ff6867]">
                        Please Register
                    </h1>
                    <form className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input
                            required
                            type="text"
                            className="input"
                            placeholder="Enter your name"
                        />
                        <label className="fieldset-label">Email</label>
                        <input
                            required
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        <label className="fieldset-label">Password</label>
                        <input
                            required
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                        <div className="text-left">
                            <p>
                                Do you have any account? Please{" "}
                                <Link to={"/login"} className="text-[#ff6867]">
                                    Login
                                </Link>
                            </p>
                        </div>
                        <button className="btn bg-gradient-to-r from-[#ff6867] mt-4 text-white border-none shadow-none">
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn bg-gradient-to-l from-[#ff6867] mt-4 text-white border-none shadow-none"
                        >
                            <FcGoogle />
                            Login With Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
