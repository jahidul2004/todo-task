import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    //User login with google
    const googleLogin = () => {
        return signInWithPopup(auth, provider);
    };


    const data = {
        googleLogin,
        user,
        setUser,
        loading,
        setLoading,
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
