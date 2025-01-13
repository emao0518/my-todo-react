import { Link } from "react-router-dom";
import styles from "./homepage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>This is home page</h1>
      <Link to="/todo">Go to To Do List Page</Link>
    </div>
  );
}
export default HomePage;
