import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  selectActiveFilter,
  clearCompletedTodoAsync,
} from "../redux/todos/todosSlice";

export default function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;

  const activeFilter = useSelector(selectActiveFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  const handleClearComp = async (completed) => {
    await dispatch(clearCompletedTodoAsync({ data: { completed } }));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => handleClearComp(items.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
}
