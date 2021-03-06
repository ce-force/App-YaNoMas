import React, { useState, createContext } from "react";

import * as firebase from "firebase";

import { baseURL } from "../constants/utils";

export const UserContext = createContext();

export const UserProvider = (prosp) => {
  const [globalUser, setGlobalUser] = useState(null);

  const getGlobalUser = async (update = false) => {
    console.log("---------------USERCONTEXT---------------------");
    if (update || !globalUser) {
      const user = firebase.auth().currentUser;
      console.log(user);
      const response = await fetch(baseURL + "/users/me", {
        headers: { uid: user.uid },
      });
      const responseJson = await response.json();
      responseJson.uid = user.uid;
      setGlobalUser(responseJson);

      console.log(responseJson);
      return responseJson;
    } else {
      return globalUser;
    }
  };

  return (
    <UserContext.Provider value={[getGlobalUser, setGlobalUser]}>
      {prosp.children}
    </UserContext.Provider>
  );
};
