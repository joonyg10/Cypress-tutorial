import { useState, useCallback, useMemo } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([{ id: 1, text: "TODO", done: false }]);
  const [todoInput, setTodoInput] = useState("");

  const addTodo = useCallback(
    (e) => {
      e.preventDefault();
      console.log(todos);
      const newTodo = { id: todos.length + 1, text: todoInput, done: false };

      // useCallback쓰면 여기서 prevTodo가 업데이트 안되는듯??
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoInput("");
    },
    [todoInput, todos]
  );

  const removeTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, done: !todo.done }
      )
    );
  }, []);

  const leftTodoCnt = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  return (
    <div className="App">
      <h2>Title</h2>
      <form onSubmit={addTodo}>
        <label>
          <input
            type="text"
            id="title"
            placeholder="Your Next Todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
        </label>
        <button type="submit">Add New Todo</button>
      </form>
      <ul>
        {todos.map(({ id, text, done }) => (
          <li className="todo" key={id} data-cy={`todo-${text}`}>
            <label>
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleTodo(id)}
              />
              <span>{text}</span>
            </label>
            <button onClick={() => removeTodo(id)}>Remove Todo</button>
          </li>
        ))}
      </ul>
      <h4>You have {leftTodoCnt} todos left</h4>
    </div>
  );
}

export default App;
