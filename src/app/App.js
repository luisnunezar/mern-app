import React from 'react';

import Navigation from './components/navigation.js';
import Home from './components/home.js';
import About from './components/about.js';

import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends React.Component {

    render() {
        return (<div>

            <BrowserRouter>
                <Navigation />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />

            </BrowserRouter>

        </div>);
    }
}