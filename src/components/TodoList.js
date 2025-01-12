import { createContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import TodoItem from "./TodoItem";
import { addTask, getTasks } from "../api/task";

export const TaskContext = createContext();

function TodoList() {
  const [list, setList] = useState([]);
  const [todoItem, setTodoItem] = useState("");

  const handleAddTodoItem = async (e) => {
    e.preventDefault();
    const task = { title: todoItem, isComplete: false };
    await addTask(task).then(({ data }) => {
      if (!data || !data.success) {
        alert(data?.error || "Server error");
      } else {
        fetchAllTasks();
        setTodoItem("");
      }
    });
  };

  const fetchAllTasks = () => {
    getTasks().then(({ data }) => {
      if (data?.success) {
        setList(data.data);
      } else {
        alert(data?.error || "Server error");
      }
    });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ fetchAllTasks }}>
      <div className={styles.container}>
        <h1>Todo List</h1>
        <div style={{ width: "320px", display: "flex" }}>
          <input
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            style={{ marginRight: "5px", flex: 1 }}
          />
          <button onClick={handleAddTodoItem} className={styles.btn}>
            Add
          </button>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          <ul style={{ padding: 0 }}>
            {list.map((item) => (
              <TodoItem item={item} />
            ))}
          </ul>
        ) : null}
      </div>
    </TaskContext.Provider>
  );
}
export default TodoList;
