import React, { useState, useEffect } from 'react';

import './home.css';

function Home() {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, [tareas.length]);

    // Añadir una tarea
    const addTask = (event) => {
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
                setTitulo('');
                setDescripcion('');
                fetchTasks();
            })
            .catch(err => console.log(err));

        event.preventDefault();
    };

    // Traer todas las tareas
    const fetchTasks = (event) => {
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
    }

    const editTask = () => {
        console.log('Editando...');
    }

    // Eliminar una tarea
    const deleteTask = (id) => {
        // console.log(`Eliminando la tarea ${id}...`);
        if (confirm('¿Seguro que desea eliminarlo?')) {
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

    return (
        <div className="container">
            <div className="row principal">
                <div className="col s5">
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

                <div className="col s7">
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tareas.map(tarea => {
                                    return (
                                        <tr key={tarea.id}>
                                            <td>{tarea.title}</td>
                                            <td>{tarea.description}</td>
                                            <td>
                                                <button className='btn' onClick={editTask} style={{ margin: '2px' }}><i className='material-icons'>edit</i></button>
                                                <button className='btn'
                                                    onClick={() => { deleteTask(tarea.id) }}
                                                    style={{ margin: '2px' }}>
                                                    <i className='material-icons'>delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default Home;