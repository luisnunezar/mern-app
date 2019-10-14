import React, { useState, useEffect } from 'react';
import Tasks from './tasks';
import Pagination from './pagination';

import './dashboard.css';

function Dashboard() {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState([]);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const [tasksPerPage] = useState(3);

    useEffect(() => {
        fetchTasks();
    }, [tareas.length]);

    // Añadir una tarea
    const addTask = (event) => {
        if (id === '') {
            fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                body: JSON.stringify({ 'title': titulo, 'description': descripcion }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Tarea Guardada.' });
                    setId('');
                    setTitulo('');
                    setDescripcion('');
                    fetchTasks();
                })
                .catch(err => console.log(err));
        } else {
            fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'title': titulo,
                    'description': descripcion
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Tarea Actualizada.' });
                    setTitulo('');
                    setDescripcion('');
                    setId('');
                    fetchTasks();
                })
                .catch(err => console.log(err));
        }

        event.preventDefault();
    };

    // Traer todas las tareas
    const fetchTasks = (event) => {
        setLoading(true);
        fetch('http://localhost:3000/api/tasks')
            .then(res => res.json())
            .then(data => {
                let auxTareas = [];
                data.forEach(element => {
                    const aux = {
                        id: element._id,
                        title: element.title,
                        description: element.description
                    };
                    auxTareas = [...auxTareas, aux];
                });
                // console.log(auxTareas);
                setTareas(auxTareas);
                // console.log(tareas);
            })
            .catch(err => console.log(err));
        setLoading(false);
    }

    // Editar una tarea
    const editTask = (id) => {
        fetch(`http://localhost:3000/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                setId(id);
                setTitulo(data.title);
                setDescripcion(data.description);
            })
            .catch(err => console.log(err));
    }

    // Eliminar una tarea
    const deleteTask = (id) => {
        if (confirm('¿Seguro que desea eliminar esta tarea?')) {
            fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Tarea Eliminada.' });
                    fetchTasks();
                })
                .catch(err => console.log(err));
        }
    }

    const handleChange = (event) => {
        if (event.target.name == 'title') setTitulo(event.target.value);
        else setDescripcion(event.target.value);
    };

    const indexLastTask = paginaActual * tasksPerPage;
    const indexFirstTask = indexLastTask - tasksPerPage;
    const currentTasks = tareas.slice(indexFirstTask, indexLastTask);

    const cambiarPagina = (numDePagina, cantPaginas) => {
        if (numDePagina < 1) setPaginaActual(1);
        else if (numDePagina >= cantPaginas.length) setPaginaActual(cantPaginas.length);
        else setPaginaActual(numDePagina);
    };

    return (
        <div className="container">
            <div className="row principal">
                <div className="col s12 l5">
                    <div className="card">
                        <div className="card-content">

                            <form onSubmit={addTask}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" value={titulo} placeholder="Título" name="title" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea className="materialize-textarea" value={descripcion} placeholder="Descripción" name="description" cols="30" rows="10" onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn">Enviar</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="col s12 l7">
                    <Tasks tareas={currentTasks} loading={loading} editTask={editTask} deleteTask={deleteTask} />
                    <Pagination tareasPorPagina={tasksPerPage} cantTareasTotal={tareas.length} paginate={cambiarPagina} pagAct={paginaActual} />
                </div>
            </div>
        </div >
    );
}

export default Dashboard;