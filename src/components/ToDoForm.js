import React, { useState } from "react";

export const ToDoForm = ({ addToDo }) => {
  const [task, setTask] = useState("");
  const [dateExecution, setDateExecution] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    addToDo({
      todo: task,
      dateExecution: dateExecution,
      created: new Date(),
    });

    setTask("");
    setDateExecution("");
  };

  return (
    <form className="todo__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo__input"
        placeholder="Input a task name"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <input
        type="datetime-local"
        className="todo__input"
        value={dateExecution}
        required
        onChange={(event) => setDateExecution(event.target.value)}
      />
      <button type="submit" className="todo__button">
        Add task
      </button>
    </form>
  );
};
