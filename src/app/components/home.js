import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './home.css';

function Home() {

    return (
        <div className='container'>
            <div className="row principal">
                <div className="col s12 center">
                    <h2>Bienvenido a MERN App</h2>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;