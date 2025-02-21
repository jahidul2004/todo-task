import { createContext, useContext } from "react";

// Create Authentication Context
const AuthContext = createContext(null);

// Custom Hook for easier use
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
