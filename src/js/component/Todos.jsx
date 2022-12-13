import React, { useState, useEffect } from "react";

// API urls
const host = 'assets.breatheco.de/apis/fake/todos/user/';


const TodoList = (props) => {
    // estados
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([props.todos]);
    const [user, setUser] = useState([props.user]);
   
    
    // fetch GET todos - consulta los todos desde la API
    const fetchApiGetTodos = async () => {
      const url = host + user;
      // genero el request
      const request = {
        method: 'GET',
        redirect: 'follow'
      };
      // realizo el fetch
      const response = await fetch(url, request);
      const responseJSON = await response.json();
      if (responseJSON.ok) { 
          responseJSON.map( (item) => { setList((e) => [...e, item.label]); });
          document.querySelector("#btnCreate").disabled = true;
          document.querySelector("#btnDelete").disabled = false;
      } else { 
        console.log('error', error);
      }
    };
  
  
    // fetch PUT todos - agrega un todo a la lista en la API
    const fetchApiPutTodos = async (todosList) => {
      const url = host + user;
      // genero el request
      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todosList)
      };
      // realizo el fetch
      const response = await fetch(url, request);
      const responseJSON = await response.json(); 
      if (responseJSON.ok) { 
        console.log('result ok')
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
        // creo una array vacio, recorro list y genero un array de objetos
        let todosPUT = [];
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          let item = {};
          item['label'] = element;
          item['done'] = false;
          todosPUT.push(item);
        };
        // agrego la nueva tarea 'task' en formato objeto
        todosPUT.push({'label': inputValue, 'done': false});
        console.log('todosPUT : ', todosPUT);
        // agrego el tecth para actualizar la API
        fetchApiPutTodos(todosPUT);
        setList([...list, inputValue]); 
        setInputValue(""); 
      }
    }
  
    useEffect(() => {
      fetchApiGetTodos();
    }, [])
  
  
    return (
      <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
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
            {list.map((listElement, index) => {
              return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                  {listElement}
                </li>
              })
            }
            <span className="list-group-item bg-light text-end fw-lighter">
                {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
            </span>
          </ul>
        </div>
    
        <div className="container mt-5">
          <h3>Notas</h3>
          <ol>
            <li><span className="text-primary">fetchApiGetTodos</span>: Consulta los 'todos' desde la API.</li>
            <li><span className="text-primary">fetchApiPutTodos</span>: Agrega un nuevo 'todo' a la API (generando la lista completa).</li>
            <li><span className="text-primary">fetchApiDeleteUser</span>: Borra el usuario y todos sus 'todos'.</li>
            <li>La API no permite borrar un solo 'todo' (se desabilita los iconos trash).</li>
          </ol>
        </div>
      </div>
    );
  };
  

const Todos = () => {
  // estados
  const [user, setUser] = useState("hchocobar");
  const [list, setList] = useState();


  const fetchApiConnetUser = async () => {
    const url = host + user;
    const request = {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        }
    }; 
    const response = await fetch(url, request);
    const responseJSON = await response.json();
    if (responseJSON.ok) {
      responseJSON.map( (item) => { setList((e) => [...e, item.label]); });
      document.querySelector("#btnCreate").disabled = true;
      document.querySelector("#btnDelete").disabled = false;
    } else {
      console.log('error', error);
    }
  };

  
  const fetchApiDeleteUser = async () => {
    const url = host + user;
    const request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
    if (responseJSON.ok) {
      setUser("");
      setList([]);
      document.querySelector("#btnCreate").disabled = false;
      document.querySelector("#btnDelete").disabled = true;
    } else {
      console.log('error', error);
    }
  };

  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-primary">Todos</h1>
      <p>Conexión: {user}</p>
      <div className="d-flex justify-content-end mb-3">
        <button type="button" id="btnCreate" className="btn btn-primary me-4"  onClick={() => fetchApiConnetUser()}>Connect User</button>
        <button type="button" id="btnDelete" className="btn btn-danger" disabled onClick={() => fetchApiDeleteUser()}>Delete User</button>
      </div>
      {user ? <TodoList user={user} todos={list}/> : <span></span>}
    </div>
  );
};

export default Todos;
