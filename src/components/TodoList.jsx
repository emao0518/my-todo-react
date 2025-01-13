import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import styles from "./todo.module.css";

const TodoList = () => {
  const { todoList, handleAddTodoItem, newTitle, setNewTitle, error } =
    useContext(TodoContext);

  return (
    <>
      <form onSubmit={handleAddTodoItem} className={styles.addContainer}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.addInput}
          placeholder="Please enter new to do item"
        />
        <button type="submit" className={styles.btn}>
          Add
        </button>
      </form>
      {error && <p className={styles.err}>{error}</p>}
      <ul>
        {todoList.map((item) => (
          <TodoItem item={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
