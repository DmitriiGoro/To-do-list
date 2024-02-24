import React, { useState, useEffect } from "react";
import { ToDoForm } from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import { ToDo } from "./ToDo";
import { EditToDoForm } from "./EditToDoForm";
import emailjs from "@emailjs/browser";
uuidv4();

export const ToDoWrapper = () => {
  const lastTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(lastTodos);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortType, setSortType] = useState("dateExecution");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // частота проверки заданий
    const time = 10000;

    const id = setInterval(() => {
      const now = Date.now();
      const remindTasks = [];

      for (const task of todos) {
        const { dateExecution } = task;

        // если разница текущего времени и срок исполнения задания меньше time, добавляем в список напоминаний
        if (new Date(dateExecution) - now <= time) {
          remindTasks.push(task);
        }
      }

      if (remindTasks.length > 0) {
        const params = {
          from_name: "Todo app",
          message: `Don't forget about upcoming tasks: ${[...remindTasks]
            .map(({ task }) => task)
            .join("\n")}`,
        };

        emailjs.init({
          publicKey: "d-M826hc2e4OOYwBj",
        });

        emailjs
          .send("service_k0la37p", "template_byg3usx", params)
          .then((result) => console.log(result))
          .catch((e) => console.log(e));
      }
    }, time);

    return () => clearInterval(id);
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addToDo = ({ todo, dateExecution, created }) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        dateExecution: dateExecution,
        created: created,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  const deleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editToDo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, dateExecution, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, dateExecution, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  const sort = () => {
    const direction = {
      asc: 1,
      desc: -1,
    };

    const newDirection = {
      asc: "desc",
      desc: "asc",
    };

    setTodos(
      todos.sort(
        (a, b) =>
          direction[sortDirection] *
          (new Date(a[sortType]) - new Date(b[sortType]))
      )
    );
    setSortDirection(newDirection[sortDirection]);
  };

  return (
    <div className="todo__wrapper">
      <ToDoForm addToDo={addToDo} todos={todos}></ToDoForm>
      {todos.length > 0 &&
        todos.map((todo, index) =>
          todo.isEditing ? (
            <EditToDoForm editToDo={editTask} task={todo} key={index} />
          ) : (
            <ToDo
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteToDo={deleteToDo}
              editToDo={editToDo}
            />
          )
        )}
      <div className="todo__sorting">
        <button className="todo__button" onClick={sort}>
          Sort by
        </button>
        <div>
          <label
            onClick={(event) => setSortType(event.target.value)}
            className="todo__label"
          >
            <input type="radio" value="created" name="sort-type" />
            created date
          </label>
          <label
            onClick={(event) => setSortType(event.target.value)}
            className="todo__label"
          >
            <input
              type="radio"
              value="dateExecution"
              defaultChecked
              name="sort-type"
            />
            execution date
          </label>
        </div>
      </div>
    </div>
  );
};
