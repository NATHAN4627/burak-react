import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "../hooks/useGlobals";
import { Member } from "../../lib/types/member";
import Cookies from "universal-cookie";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authMember, setAuthMember] = useState<Member | null>(() => {
    const memberData = localStorage.getItem("memberData");
    return new Cookies().get("accessToken") && memberData
      ? JSON.parse(memberData)
      : null;
  });

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  // useEffect(() => {
  //   const cookies = new Cookies();
  //   const syncAuth = () => {
  //     if (!cookies.get("accessToken")) localStorage.removeItem("memberData");
  //     if (!localStorage.getItem("memberData")) setAuthMember(null);
  //   };

  //   syncAuth();
  //   cookies.addChangeListener(syncAuth);
  //   window.addEventListener("storage", syncAuth);
  //   window.addEventListener("focus", syncAuth);

  //   return () => {
  //     cookies.removeChangeListener(syncAuth);
  //     window.removeEventListener("storage", syncAuth);
  //     window.removeEventListener("focus", syncAuth);
  //   };
  // }, []);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
