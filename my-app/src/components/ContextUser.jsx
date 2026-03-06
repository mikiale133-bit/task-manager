import React, { useContext } from "react";
// Make sure to import the Context object, not just the Provider!
import { UserContext } from "../context/userContext";

const UserProfile = () => {
  // We hook into the Context here
  const { user, login, logout } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>No user currently</h2>
          <button onClick={login}>Login a user</button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
