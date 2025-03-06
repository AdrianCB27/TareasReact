import { useState, useContext } from "react";
import { TaskContext } from "../../TaskContext";

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }) {
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const { isLoggedIn } = useContext(TaskContext); 

  const empezarEdicion = (index, text) => {
    setEditandoIndex(index);
    setNuevoTexto(text);
  };

  const guardarEdicion = (index) => {
    onEditTask(index, nuevoTexto);
    setEditandoIndex(null);
  };
  if (tasks.length === 0) {
    return <p>No hay tareas, añade una.</p>;
    
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(index)}
            disabled={!isLoggedIn}
          />
          {editandoIndex === index ? (
            <input
              type="text"
              value={nuevoTexto}
              onChange={(e) => setNuevoTexto(e.target.value)}
              disabled={!isLoggedIn} 
            />
          ) : (
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
          )}
          {isLoggedIn && ( 
            <>
              <button onClick={() => onDeleteTask(index)}>Eliminar</button>
              {editandoIndex === index ? (
                <button onClick={() => guardarEdicion(index)}>Guardar</button>
              ) : (
                <button onClick={() => empezarEdicion(index, task.text)}>Editar</button>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
