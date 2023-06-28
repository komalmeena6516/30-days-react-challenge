import React, { useState } from "react";
import "./style.css";

const TodoList = () => {

    const todoInitialValue = JSON.parse(localStorage.getItem('mytodolist')) || [];
  const [todos, setTodos] = useState(todoInitialValue );

  const handleSubmit= (e)=> {
    e.preventDefault();
    //the default function of submit event is it reloads the webpage
    const newTodo = {
      text: e.target.elements.todo.value,
      done: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    e.target.elements.todo.value = "";
  }

  const handleDone=(i, e)=> {
    //copy the old todos
    const updatedTodos = [...todos];

    //change the done state of the todo at index i
    updatedTodos[i].done = !updatedTodos[i].done;
    setTodos(updatedTodos);
    localStorage.setItem("mytodolist", JSON.stringify(updatedTodos));
  }

  const handleDelete = (i) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(i, 1);
    setTodos(updatedTodos);
    localStorage.setItem("mytodolist", JSON.stringify(updatedTodos));
  };

  const handleEditButtonClick = (i) => {
    const updatedTodos = [...todos];
    updatedTodos[i].editing = !updatedTodos[i].editing;
    setTodos(updatedTodos);
    localStorage.setItem("mytodolist", JSON.stringify(updatedTodos));
  };

  const handleEdit = (e, i) => {
    const updatedTodos = [...todos];
    updatedTodos[i].text = e.target.value;
    setTodos(updatedTodos);
    localStorage.setItem("mytodolist", JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      <h1 className="display-1 text-center">Todo List</h1>
      <form action="" className="mb-4 row" onSubmit={handleSubmit}>
        <div className="col-sm-8">
          <input
            type="text"
            placeholder="Enter todo task"
            name="todo"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary col-sm-4">
          Add task
        </button>
      </form>

      <div>
        <h2 className="display-6">Current todos</h2>
        {todos.length === 0 ? (
          <h2 className="display-6 text-center">No Todos...</h2>
        ) : (
          <ul className="list-group">
            {todos.map((todo, i) => (
              <li className="list-group-item" key={i}>
                {todo.editing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={todo.text}
                    onChange={(e) => handleEdit(e, i)}
                  />
                ) : (
                  <>
                    <input
                      type="checkbox"
                      className="form-check-input mx-2"
                      checked={todo.done}
                      onChange={(e) => handleDone(i, e)}
                    />
                    <label
                      style={{
                        textDecoration: todo.done ? "line-through" : "none",
                      }}
                      className="form-check-label"
                    >
                      {todo.text}
                    </label>
                  </>
                )}

                <button
                  className="btn btn-secondary mx-1"
                  style={{ float: "right" }}
                  onClick={() => handleEditButtonClick(i)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-1"
                  style={{ float: "right" }}
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
