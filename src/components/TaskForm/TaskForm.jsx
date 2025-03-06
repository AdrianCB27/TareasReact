import { useState, useContext } from "react";
import { TaskContext } from "../../TaskContext";

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
      setError("");
    } else {
      setError("Por favor, ingresa una tarea válida.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => {
          setTaskText(e.target.value);
          setError("");
        }}
        placeholder="Nueva tarea..."
        disabled={!isLoggedIn} 
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!taskText.trim() || !isLoggedIn}>
        Añadir Tarea
      </button>
    </form>
  );
}

export default TaskForm;