import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    {}
  );
  const [loading, setLoading] = useState(true);

  const verify = async () => {
    try {
      const respons = await fetch("http://localhost:9000/auth/verify", {
        credentials: "include",
      });
      const data = await respons.json();
      setUser(data.user);
      console.log(data)
    } catch (error) {
      console.error("error", error)
      setUser({});
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const logout = async () => {
    try {
      const respons = await fetch("http://localhost:9000/auth/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(respons);
      setUser(null);
      return true
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, verify }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);