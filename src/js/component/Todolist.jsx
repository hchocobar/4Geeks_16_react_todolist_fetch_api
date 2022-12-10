import React, { useState, useEffect } from "react";

const Todolist = () => {
  // estados
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchApiGETTodos();
  }, [])

  // API urls
  let url = 'https://assets.breatheco.de/apis/fake/todos/user/';
  let user = 'hchocobar';
  let urlUser = url + user;

  // fetch GET todos - consulta los todos desde la API
  const fetchApiGETTodos = async () => {
    // genero el response
    const request = {
      method: 'GET',
      redirect: 'follow'
    };
    // realizo el fetch
    await fetch(urlUser, request)
      .then(response => response.json())
      .then(result => { result.map( (item) => { setList((e) => [...e, item.label]); } ) } )
      .catch(error => console.log('error', error))
  };


  // fetch PUT todos - agrega un todo a la lista en la API
  const fetchApiPUTTodos = async (task) => {
    // creo una array vacio, recorro list y genero un array de objetos
    var todosPUT = [];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      let item = {};
      item['label'] = element;
      item['done'] = false;
      todosPUT.push(item);
    };
    // agrego la nueva tarea 'task' en formato objeto
    todosPUT.push({'label': task, 'done': false});
    // genero el response
    const response = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todosPUT),
    };
    // realizo el fetch
    await fetch(urlUser, response)
      .then(response => console.log('actualizarLista - response PUT', response))
      .catch(error => console.log('actualizarLista - error', error))
  }

  // funcion onSubmit del form
  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") return;
    // agrego el tecth para actualizar la API
    fetchApiPUTTodos(inputValue);
    setList([...list, inputValue]);
    setInputValue("");
  }

  // funcion onClick del icono trash
  const deleteTask = (index) => {
    /* la API no responde al metodo DELETE para borrar un solo todos, por ello esta función se comenta
    const newList = list.filter((element, id)=> index !== id);
    setList(newList);
    */
    return
  };

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
          {list.map((listElement, index) => {
            return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                {listElement}
                {/* La API no permite borrar un solo 'todo'- se desabilita los iconos trash
                <span>
                  <a key={index} onClick={(event) => {deleteTask(index)}}>
                    <i className="fas fa-trash"></i>
                  </a>
                </span> */}
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
          <li><span className="text-primary">fetchApiGETTodos</span>: Consulta los 'todos' desde la API.</li>
          <li><span className="text-primary">fetchApiPUTTodos</span>: Agrega un nuevo 'todo' a la API (generando la lista completa).</li>
          <li>La API no permite borrar un solo 'todo' (se desabilita los iconos trash).</li>
        </ol>
      </div>
    </div>
  );
};

export default Todolist;
