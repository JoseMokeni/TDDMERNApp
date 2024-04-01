import AddForm from "./components/AddForm/AddForm";
import TaskList from "./components/TaskList/TaskList";
import Header from "./components/Header/Header";

import { useState, useEffect } from "react";

function App() {
  // get tasks from the server
  const [tasks, setTasks] = useState([]);

  const deleteTask = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div class="container mx-auto">
      <Header />
      <AddForm
        submit={(task) => {
          fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((data) => setTasks([...tasks, data]));
        }}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
