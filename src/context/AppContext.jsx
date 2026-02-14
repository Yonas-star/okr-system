import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Login UI", status: "Todo" },
    { id: 2, title: "Build Dashboard", status: "In Progress" },
    { id: 3, title: "Create OKR Page", status: "Done" },
  ]);

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
