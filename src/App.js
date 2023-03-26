import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { title: todo, isChecked: false, id: nanoid() }]);
    setTodo("");
  };
  const handleCheck = (data) => {
    const myTodo = todos.find((todo) => todo.id === data.id);
    myTodo.isChecked = !data.isChecked;
    setTodos([...todos]);
  };
  const handleRemoveTodo = (todo) => {
    setTodos(todos.filter((data) => data.id !== todo.id));
  };
  const handleClearActive = () => {
    setTodos(
      todos.filter((todo) => {
        return !todo.isChecked;
      })
    );
  };
  const filterFunction = (statusFilter) => {
    if (statusFilter === "All") {
      return [...todos];
    } else if (statusFilter === "Active") {
      return todos.filter((todo) => todo.isChecked === false);
    }
    return todos.filter((todo) => todo.isChecked === true);
  };

  const activeTodosLength = todos.filter((data) => !data.isChecked).length;
  const filteredTodos = filterFunction(statusFilter);

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleAddTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodos.map((todo) => {
              return (
                <li key={todo.id} className={todo.isChecked ? "completed" : ""}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => {
                        handleCheck(todo);
                      }}
                    />
                    <label>{todo.title}</label>
                    <button
                      className="destroy"
                      onClick={() => handleRemoveTodo(todo)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodosLength}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={statusFilter === "All" ? "selected" : ""}
                name="All"
                onClick={() => setStatusFilter("All")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Active" ? "selected" : ""}
                name="Active"
                onClick={() => setStatusFilter("Active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Completed" ? "selected" : ""}
                name="Completed"
                onClick={() => setStatusFilter("Completed")}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={handleClearActive}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
