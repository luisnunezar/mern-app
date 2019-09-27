import React from 'react';

const Tasks = ({ tareas, loading, editTask, deleteTask }) => {
    return <table>
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
                                <button className='btn'
                                    onClick={() => { editTask(tarea.id) }}
                                    style={{ margin: '2px' }}>
                                    <i className='material-icons'>edit</i>
                                </button>

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
}

export default Tasks;