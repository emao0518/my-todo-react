import { useContext, useState } from "react";
import styles from "./todo.module.css";
import { deleteTask, updateTask } from "../api/task";
import { TodoContext } from "../context/TodoContext";

function TodoItem({ item }) {
  const { todoList, setTodoList, setError } = useContext(TodoContext);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title);

  const handleDeleteTodoItem = async (e) => {
    e.preventDefault();
    const { data } = await deleteTask(item._id);
    if (!data || !data.success) {
      setError(data?.error || "Server error");
    } else {
      setError("");
      setTodoList(todoList.filter((ele) => ele._id !== item._id));
    }
  };

  const handleUpdateTodoItem = async (e, task) => {
    e.preventDefault();
    const { data } = await updateTask(item._id, task);
    if (!data || !data.success) {
      setError(data?.error || "Server error");
    } else {
      setError("");
      const newTask = data.data;
      setTodoList(
        todoList.map((ele) => (ele._id === item._id ? newTask : ele)),
      );
    }
  };

  const handleEditClick = async (e) => {
    if (isEdit) {
      if (value !== item.title) {
        await handleUpdateTodoItem(e, {
          title: value,
          isComplete: item.isComplete,
        });
      }
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  if (!item) return null;

  return (
    <li className={styles.itemContainer}>
      <button
        className={styles.itemLeft}
        onClick={(e) =>
          handleUpdateTodoItem(e, {
            title: item.title,
            isComplete: !item.isComplete,
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
            fill={item.isComplete ? "grey" : "none"}
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
              ...(item.isComplete ? { textDecoration: "line-through" } : {}),
            }}
          >
            {item?.title}
          </p>
        )}
      </button>
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          disabled={item.isComplete ? true : false}
          onClick={(e) => {
            handleEditClick(e);
          }}
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
