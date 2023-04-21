import React, { createContext, useReducer } from "react";
import userReducer from "./userReducer";

const getUser = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("am-store-user")) {
      return JSON.parse(localStorage.getItem("am-store-user"));
    } else {
      return {};
    }
  }
};

let initialState = {
  user: getUser(),
  loadingUser: false,
  error: null,
};

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loadingUser: state.loadingUser,
        success: state.success,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
