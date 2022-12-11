import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";


function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect (()=>{
    const fromLocalStorage=localStorage.getItem("todos")
    
    if (fromLocalStorage ===null) {
      localStorage.setItem("todos",JSON.stringify([]))
      
    }else{
      setTodos(JSON.parse(fromLocalStorage))
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault(event);
    if (todoText === "") {
      alert("Todo cannot be empty!");
      return;
    }
    const todo = {
      id: new Date().getTime(),
      text: todoText,
      isDone: false,
      createdAt: new Date(),
    };
    
    setTodos([...todos, todo]);
    localStorage.setItem("todos",JSON.stringify([...todos,todo]))
    setTodoText("");
  };

  return (
    <div className="container p-5">
      <h1 className="text-center my-3">My Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Type your todo..."
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Add
          </button>
        </div>
      </form>
      <div>
        {todos.length !== 0 ? (
          <div>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center my-5">You dont have any Todos yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
