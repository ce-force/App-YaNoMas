import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (prosp) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      {prosp.children}
    </UserContext.Provider>
  );
};
