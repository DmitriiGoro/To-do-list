import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { makeDate } from "../utils/makeDate";

export const ToDo = ({ task, toggleComplete, deleteToDo, editToDo }) => {
  return (
    <div className="todo">
      <div className="todo__inner">
        <p
          onClick={() => {
            toggleComplete(task?.id);
          }}
          className={`${task?.completed ? "completed" : ""}`}
        >
          {task?.task || "No name"}
        </p>
        <p className="todo__exec-date">
          Do it before: {makeDate(task.dateExecution)}
        </p>
        <p className="todo__exec-date">Created: {makeDate(task?.created)}</p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editToDo(task?.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteToDo(task?.id)} />
      </div>
    </div>
  );
};
