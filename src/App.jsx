import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let t = new Date();
  let formattedTime = t.toLocaleTimeString([], {
    timeStyle: "short",
  });

  let [time, setTime] = useState(formattedTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      formattedTime = new Date().toLocaleTimeString([], {
        timeStyle: "short",
      });
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [list, setList] = useState(() => {
    const data = localStorage.getItem("todo-list");
    return data ? JSON.parse(data) : [];
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const addTodo = (todo) => {
    if (todo.trim() !== "") {
      const newTodo = {
        id: Math.trunc(Math.random() * 1000),
        todo: todo,
        done: false,
      };

      setList([...list, newTodo]);
      setTitle("");
    }
  };

  const handleDone = (id) => {
    const newList = list.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setList(newList);
  };

  const handleRemove = (id) => {
    const newList = list.filter((todo) => todo.id !== id);

    setList(newList);
  };

  return (
    <>
      <h1>{time}</h1>
      <h2>Todo</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => addTodo(title)} style={{ margin: "2px" }}>
        +
      </button>

      <ul style={{ listStyle: "none" }}>
        {list.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {todo.todo}
            <button
              onClick={() => handleDone(todo.id)}
              style={{ margin: "2px" }}
            >
              Check
            </button>
            <button onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
