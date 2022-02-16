import React, { useState } from "react";

import "./sass/main.scss";
import img from "./img/motivation.jpg";
import { data } from "./utils/data";
import makeNewId from "./utils/hash";

// Components
import CreateToDo from "./components/CreateToDo";
import ToDoList from "./components/ToDoList";

function App() {
  const [toDoItems, setToDoItems] = useState(data);
  const [value, setValue] = useState("");
  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const newToDo = {
      id: makeNewId(),
      text: value,
      done: false,
      isEditing: false,
    };
    setToDoItems((prevState) => [...prevState, newToDo]);
  }
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }
  function handleDelete(id) {
    const deleteIndex = toDoItems.find((index) => index.id === id);
    setToDoItems((prevState) => {
      const newState = prevState.filter((item) => item !== deleteIndex);
      return newState;
    });
  }
  function isCompleted(id) {
    const updateIndex = toDoItems.find((index) => index.id === id);
    const item = toDoItems.indexOf(updateIndex);
    setToDoItems((prevState) => {
      const newState = Array.from(prevState);
      newState[item].done = !newState[item].done;
      console.log(newState);
      return newState;
    });
  }
  return (
    <main className="">
      <header>
        <img src={img} alt="motivated person in the mountains" />
      </header>
      <section className="todo-list">
        <div className="main-header">
          <h1>TODO</h1>
          <button className="" type="button">
            <span className="material-icons-outlined md-48">light_mode</span>
          </button>
        </div>
        <CreateToDo
          value={value}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
        />
        <ToDoList
          data={toDoItems}
          handleDelete={handleDelete}
          isCompleted={isCompleted}
        />
        {/* <h6>Drag and drop to reorder list</h6> */}
      </section>
    </main>
  );
}

export default App;
