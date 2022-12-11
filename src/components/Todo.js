import React, { useState } from "react";

const Todo = (props) => {
  const { todo, todos, setTodos } = props;
  console.log(todos);

  const [isEdit, setisEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const tarih = new Date(todo.createdAt);

  const handleDelete = () => {
    const temporaryList = todos.filter((item) => item.id !== todo.id);
    setTodos(temporaryList);
    localStorage.setItem("todos",JSON.stringify(temporaryList))

  };

  const handleDone = () => {
    const newtodo = {
      ...todo,
      isDone: !todo.isDone,
    };
    const newList = todos.filter((item) => item.id !== todo.id);
    const newList2 = [...newList, newtodo];
    setTodos(newList2);

  localStorage.setItem("todos",JSON.stringify(newList2))
  };
  const handleEdit = () => {
    const newTodo = {
      ...todo,
      text: updatedText,
    };
    const newEditedList = todos.filter((item) => item.id !== todo.id);
    setTodos([...newEditedList, newTodo]);
    setisEdit(false);
    localStorage.setItem("todos",JSON.stringify(updatedText))
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-between alert alert-${
        todo.isDone === false ? "secondary" : "success"
      }`}
    >
      <div>
        {isEdit === false ? (
          <h1
            className={`${
              todo.isDone === true ? "text-decoration-line-through" : ""
            }`}
          >
            {todo.text}{" "}
          </h1>
        ) : (
          <div className="d-flex">
            <input
              value={updatedText}
              onChange={(event) => setUpdatedText(event.target.value)}
            />
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-outline-primary"
            >
              Save
            </button>
          </div>
        )}

        <small>{tarih.toLocaleString()}</small>
      </div>
      <div>
        <div className="btn-group">
          <button
            onClick={handleDone}
            type="button"
            className="btn btn-sm btn-success"
          >
            {todo.isDone === false ? "Done" : "Undone"}
          </button>
          <button
            onClick={() => {
              setisEdit(!isEdit);
              if (isEdit === true) {
                setUpdatedText(todo.text);
              }
            }}
            type="button"
            className="btn btn-sm btn-secondary"
            
          >
            {isEdit === false ? "Edit" : "Cancel"}
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
