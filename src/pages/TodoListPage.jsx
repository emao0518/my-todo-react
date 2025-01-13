import styles from "./todolistpage.module.css";
import { TodoProvider } from "../context/TodoContext";
import TodoList from "../components/TodoList";

function TodoListPage() {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo List</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}
export default TodoListPage;
