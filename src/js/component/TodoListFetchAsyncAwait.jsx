import React, { useState, useEffect } from "react";

const Todolist = () => {
  // estados
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  // API urls
  let host = 'https://assets.breatheco.de/apis/fake/todos/user/';
  let user = 'hchocobar';

  // fetch GET todos - consulta los todos desde la API
  const fetchGetTodos = async () => {
    const url = host + user;
    const request = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
    responseJSON.map( (item) => {setList((e) => [...e, item.label]);} )
  };


  // fetch PUT todos - agrega un todo a la lista en la API
  const fetchPutTodos = async (todos) => {
    const url = host + user;
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
    if (responseJSON.ok) { 
      console.log("todo ok");
    } else {
      console.log('error', error);
    }
  }

  // funcion onSubmit del form
  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    } else {
      // creo una array vacio, recorro list, y genero un array de objetos
      var todosPUT = [];
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        let item = {};
        item['label'] = element;
        item['done'] = false;
        todosPUT.push(item);
      };
      // agrego la nueva tarea 'inputValue' en formato objeto
      todosPUT.push({'label': inputValue, 'done': false});
      // agrego el tecth para actualizar la API
      fetchPutTodos(todosPUT);
      setList([...list, inputValue]); 
      setInputValue(""); 
    }
  }


  useEffect(() => {
    fetchGetTodos();
  }, [])


  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-primary">Todos</h1>
      <div className="mb-3">
        <form onSubmit = {addTask}>
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
          {list.map( (listElement, index) => {
            return  <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                        {listElement}
                    </li>
            })
          }
          <span className="list-group-item bg-light text-end fw-lighter">
              {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
          </span>
          <span className="list-group-item bg-light text-end fw-lighter">
              Conexión: {!user ? "No hay usuario conectado" : host + user}
          </span>
        </ul>
      </div>
      <div className="container mt-5">
        <h3>Notas</h3>
        <ol>
          <li><span className="text-primary">fetchGetTodos</span>: Consulta los 'todos' desde la API.</li>
          <li><span className="text-primary">fetchPutTodos</span>: Agrega un nuevo 'todo' a la API (generando la lista completa).</li>
          <li>La API no permite borrar un solo 'todo' (se desabilita los iconos trash).</li>
        </ol>
      </div>
    </div>
  );
};

export default Todolist;
