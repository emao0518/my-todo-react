import { useContext, useState } from "react";
import styles from "./page.module.css";
import { TaskContext } from "./TodoList";
import { deleteTask, updateTask } from "../api/task";

function TodoItem({ item }) {
  const { fetchAllTasks } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title);

  const handleDeleteTodoItem = async (e) => {
    e.preventDefault();
    await deleteTask(item._id).then(({ data }) => {
      if (!data || !data.success) {
        alert(data?.error || "Server error");
      } else {
        fetchAllTasks();
      }
    });
  };

  const handleUpdateTodoItem = async (e, task) => {
    e.preventDefault();
    await updateTask(item._id, task).then(({ data }) => {
      if (!data || !data.success) {
        alert(data?.error || "Server error");
      } else {
        fetchAllTasks();
      }
    });
  };

  const handleEditClick = async (e) => {
    if (isEdit) {
      await handleUpdateTodoItem(e, {
        title: value,
        isComplete: item.isComplete,
      });
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  if (!item) return null;

  return (
    <li id={item._id} className={styles.itemContainer}>
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
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "100%", marginRight: "5px" }}
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
      <div style={{ display: "inline-flex" }}>
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
