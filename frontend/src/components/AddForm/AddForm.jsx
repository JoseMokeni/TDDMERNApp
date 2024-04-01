import React from "react";
import { useState } from "react";

const AddForm = ({ submit }) => {
  const [task, setTask] = useState({ title: "" });

  return (
    <form
      className="flex justify-center mt-10"
      name="addTask"
      onSubmit={(e) => {
        e.preventDefault();
        submit(task);
        setTask({ title: "" });
      }}
    >
      <input
        type="text"
        className="border border-gray-400 w-1/2 py-2 px-3"
        placeholder="Add a task"
        value={task.title}
        onChange={(e) => setTask({ title: e.target.value })}
      />
      <button className="bg-blue-500 text-white py-2 px-3" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddForm;
