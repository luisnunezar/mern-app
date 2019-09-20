import React, { useState } from 'react';

import './home.css';

function Home() {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const addTask = (event) => {
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ 'title': titulo, 'description': descripcion }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        event.preventDefault();
    };

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
                                        <input type="text" placeholder="Título" name="title" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea className="materialize-textarea" placeholder="Descripción" name="description" cols="30" rows="10" onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn">Enviar</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="col s7">

                </div>
            </div>
        </div >
    );
}

export default Home;