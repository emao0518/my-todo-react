import { useState } from "react";
import styles from "./todo.module.css";
import { deleteTask, updateTask } from "../api/task";
import { useTodoContext } from "../context/TodoContext";

function TodoItem({ item: { _id, title, isComplete } }) {
  const { todoList, setTodoList, setError } = useTodoContext();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);

  const handleDeleteTodoItem = async (e) => {
    e.preventDefault();
    const { data } = await deleteTask(_id);
    if (!data || !data.success) {
      setError(data?.error || "Server error");
    } else {
      setError("");
      setTodoList(todoList.filter((ele) => ele._id !== _id));
    }
  };

  const handleUpdateTodoItem = async (e, task) => {
    e.preventDefault();
    const { data } = await updateTask(_id, task);
    if (!data || !data.success) {
      setError(data?.error || "Server error");
    } else {
      setError("");
      const newTask = data.data;
      setTodoList(todoList.map((ele) => (ele._id === _id ? newTask : ele)));
    }
  };

  const handleEditClick = async (e) => {
    if (isEdit) {
      if (value !== title) {
        await handleUpdateTodoItem(e, {
          title: value,
          isComplete,
        });
      }
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <li className={styles.itemContainer}>
      <button
        className={styles.itemLeft}
        onClick={(e) =>
          handleUpdateTodoItem(e, {
            title,
            isComplete: !isComplete,
          })
        }
        disabled={isEdit ? true : false}
      >
        <svg width="15" height="15">
          <circle
            cx="7"
            cy="7"
            r="6"
            stroke="grey"
            fill={isComplete ? "grey" : "none"}
          />
        </svg>
        {isEdit ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.inputBox}
          />
        ) : (
          <p
            style={{
              margin: "0px 5px",
              ...(isComplete ? { textDecoration: "line-through" } : {}),
            }}
          >
            {title}
          </p>
        )}
      </button>
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          disabled={isComplete}
          onClick={handleEditClick}
        >
          {isEdit ? "Confirm" : "Edit"}
        </button>
        <button className={styles.btn} onClick={handleDeleteTodoItem}>
          Delete
        </button>
      </div>
    </li>
  );
}
export default TodoItem;
