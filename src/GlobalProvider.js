import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [expense, setExpense] = useState([]);
  return (
    <GlobalContext.Provider value={[expense, setExpense]}>
      {children}
    </GlobalContext.Provider>
  );
};
