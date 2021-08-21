import { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
