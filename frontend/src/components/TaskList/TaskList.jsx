import React from "react";

const TaskList = ({ tasks, deleteTask }) => {
  const handleDelete = (e) => {
    // delete task
    deleteTask(e.target.id);
  };
  return (
    <ul className="mt-10">
      {tasks.length === 0 ? (
        <li className="text-center">No tasks</li>
      ) : (
        tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center border-b border-gray-400 py-2"
          >
            <span>{task.title}</span>
            <button
              className="text-red-500"
              onClick={handleDelete}
              id={task._id}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
