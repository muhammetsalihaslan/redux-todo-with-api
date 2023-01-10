import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../redux/todos/todosSlice";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();
    await dispatch(addTodosAsync({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <span style={{ paddingRight: "10px" }}>Loading...</span>}
      {error && <Error message={error} />}
    </form>
  );
};

export default Form;
