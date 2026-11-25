import { createContext, useContext } from "react";
import { GlobalContext } from "../context/ContextProvider";

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals withit Provider");

  return context;
};
