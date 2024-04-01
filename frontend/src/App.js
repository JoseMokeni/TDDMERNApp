import AddForm from "./components/AddForm/AddForm";
import TaskList from "./components/TaskList/TaskList";
import Header from "./components/Header/Header";

import { useState, useEffect } from "react";

function App() {
  // get tasks from the server
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  return (
    <div class="container mx-auto">
      <Header />
      <AddForm />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
