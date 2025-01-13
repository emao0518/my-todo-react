import { createContext, useEffect, useState } from "react";
import * as taskAPI from "../api/task";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllTasks = () => {
      taskAPI.getTasks().then(({ data }) => {
        if (data?.success) {
          setTodoList(data.data);
        } else {
          alert(data?.error || "Server error");
        }
      });
    };

    fetchAllTasks();
  }, []);

  const handleAddTodoItem = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const newToDo = { title: newTitle, isComplete: false };
    taskAPI.addTask(newToDo).then(({ data }) => {
      if (!data || !data.success) {
        setError(data?.error || "Server error");
      } else {
        setError("");
        setTodoList([...todoList, data.data]);
        setNewTitle("");
      }
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        handleAddTodoItem,
        newTitle,
        setNewTitle,
        error,
        setError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
