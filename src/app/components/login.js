import React, { useState, useEffect } from 'react';

import './login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err));
    }

    const handleChange = (event) => {
        if (event.target.name == 'email') setEmail(event.target.value);
        if (event.target.name == 'password') setPassWord(event.target.value);
    };

    return (
        <div className="container">
            <div className="row principal">
                <div className="col s12 l6 offset-l3">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <div className="input-field">
                            <input type='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Password</label>
                        <div className="input-field">
                            <input type='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;