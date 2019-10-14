import React from 'react';

import Navigation from './components/navigation.js';
import Home from './components/home.js';
import Login from './components/login.js';
import About from './components/about.js';
import Dashboard from './components/dashboard.js';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Navigation />

                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={About} />
                <Route path="/dashboard" component={Dashboard} />

            </BrowserRouter>

        </div>
    );
}

export default App;