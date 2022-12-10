import React, { useState } from "react";

const Todolist = () => {
  // estados
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState(['Make the bed', 'Wash my hands', 'Eat', 'Walk the dog']); 

  // funcion onClick del icono trash
  const deleteTask = (index) => {
    setList(list.filter((element, id)=>{
      return index !== id;
    }))
  };

  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-primary">Todos</h1>
      <div className="mb-3">
        <form onSubmit = {(event) => {
            event.preventDefault();
            if (inputValue === "") return;
            setList([...list, inputValue]);
            setInputValue("");
          }}>
          <input className="form-control" 
              placeholder="Write a new task" 
              type="text" 
              value={inputValue} 
              onChange={(event)=>{setInputValue(event.target.value);}}
          />
        </form>
      </div>
      <h2 className="text-primary">Todos List</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((listElement, index) => {
            return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                {listElement}
                <span>
                  <a key={index} onClick={(event) => {deleteTask(index)}}>
                    <i className="fas fa-trash"></i>
                  </a>
                </span>
              </li>
            })
          }
          <span className="list-group-item bg-light text-end fw-lighter">
              {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
          </span>
        </ul>
      </div> 
    </div>
  );
};

export default Todolist;
