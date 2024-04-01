import React from "react";

const AddForm = () => {
  return (
    <form className="flex justify-center mt-10" name="addTask">
      <input
        type="text"
        className="border border-gray-400 w-1/2 py-2 px-3"
        placeholder="Add a task"
      />
      <button className="bg-blue-500 text-white py-2 px-3" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddForm;
