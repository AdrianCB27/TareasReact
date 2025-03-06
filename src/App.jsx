import { useContext, useState } from "react";
import { TaskProvider, TaskContext } from "./TaskContext";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import Filter from "./components/Filter/Filter";
import "./App.css";
import { useEffect } from "react";

function App() {
  const { tasks, setTasks, isLoggedIn, setIsLoggedIn } = useContext(TaskContext);
  const [tareasFiltradas, setTareasFiltradas] = useState(tasks);
  const [filtroActivo, setFiltroActivo] = useState("todas");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //no funciona bien :(
  }, [tasks]); 

  const addTask = (text) => {
    const newTasks = [...tasks, { text, completed: false }];
    setTasks(newTasks);
  };
  
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  
  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };
  
  const editTask = (index, newText) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(newTasks);
  };
  

  const filterTask = (estado) => {
    setFiltroActivo(estado);
    switch (estado) {
      case "sin completar":
        setTareasFiltradas(tasks.filter((tarea) => !tarea.completed));
        break;
      case "completadas":
        setTareasFiltradas(tasks.filter((tarea) => tarea.completed));
        break;
      default:
        setTareasFiltradas(tasks);
        break;
    }
  };

  return (
    <div className="app">
      <h1>Gestión de Tareas - 2º DAW</h1>
      {/* para que aparezca segun si esta logeado o no el usuario */}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>  
        {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
      </button>
      {isLoggedIn ? (
        <>
          <Filter onFilter={filterTask} />
          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={filtroActivo === "todas" ? tasks : tareasFiltradas}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onEditTask={editTask}
          />
        </>
      ) : (
        <p>Tienes que iniciar sesión para gestionar las tareas</p>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <TaskProvider>
      <App />
    </TaskProvider>
  );
}