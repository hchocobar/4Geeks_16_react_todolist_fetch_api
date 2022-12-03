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
    <div className="container">
      <h1 className="text-center">Todos</h1>
      <div className="mb-3">
        <form onSubmit = {(event) => {
            event.preventDefault();
            if (inputValue === "") return;
            setList([...list, inputValue]);
            setInputValue("");
          }}>
          <input className="form-control" 
              placeholder="Write a Task" 
              type="text" 
              value={inputValue} 
              onChange={(event)=>{setInputValue(event.target.value);}}
          />
        </form>
      </div>
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
          <span className="list-group-item fw-lighter">
              {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
          </span>
        </ul>
      </div> 
    </div>
  );
};

export default Todolist;
