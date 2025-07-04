import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDataUser = async () => {
    try {
      const res = await fetch("http://localhost:9000/user", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        console.log("✅ Data user dari /user:", data)
        setUser(data.user);
      }
    } catch (error) {
      console.error("Gagal ambil data user:", error);
    } finally{
              setLoading(false)
    }
  };

  const uploadAvatar = async (file) => {

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost:9000/user/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      await loadDataUser();
    } catch (err) {
      console.error("Upload avatar gagal:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadDataUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser: loadDataUser,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
