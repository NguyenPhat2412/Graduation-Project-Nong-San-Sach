import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/user`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Create Consumer
export const useUser = () => useContext(UserContext);
