import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [expense, setExpense] = useState([]);
  const [time, setTime] = useState("today");
  return (
    <GlobalContext.Provider value={{ expense, setExpense, time, setTime }}>
      {children}
    </GlobalContext.Provider>
  );
};
