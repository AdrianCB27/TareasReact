import { createContext, useState, useEffect } from "react";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, isLoggedIn, setIsLoggedIn }}>
      {children}
    </TaskContext.Provider>
  );
};