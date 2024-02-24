import React, { useState } from "react";

export const EditToDoForm = ({ editToDo, task }) => {
  const [todo, setToDo] = useState(task.task);
  const [dateExecution, setDateExecution] = useState(task.dateExecution);

  const handleSubmit = (event) => {
    event.preventDefault();

    editToDo(todo, dateExecution, task.id);

    setDateExecution("");
    setToDo("");
  };

  return (
    <form className="todo__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo__input"
        placeholder="Update task"
        value={todo}
        onChange={(event) => setToDo(event.target.value)}
      />
      <input
        type="datetime-local"
        className="todo__input"
        placeholder="Do it before..."
        value={dateExecution}
        required
        onChange={(event) => setDateExecution(event.target.value)}
      />
      <button type="submit" className="todo__button">
        Update task
      </button>
    </form>
  );
};
