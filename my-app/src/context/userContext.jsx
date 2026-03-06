import { useState, createContext } from "react";
// import { UserContext } from "./createContext";
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ name: "Mikiale", email: "mikiale@gmail.com" });
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    login,
    logout,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {children}{" "}
    </UserContext.Provider>
  );
};
