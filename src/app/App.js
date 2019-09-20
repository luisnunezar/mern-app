import React from 'react';

import Navigation from './components/navigation.js';
import Home from './components/home.js';
import About from './components/about.js';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Navigation />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />

            </BrowserRouter>

        </div>
    );
}

export default App;