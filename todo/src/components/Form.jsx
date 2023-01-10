import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodosAsync } from "../redux/todos/todosSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();
    await dispatch(addTodosAsync({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default Form;
