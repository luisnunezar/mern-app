import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './navigation.css';

function Navigation() {

    return (
        <div>
            <nav className="main-nav">
                <div className="nav-wrapper container">
                    <NavLink exact className="brand-logo" to="/" activeStyle={{ backgroundColor: "transparent" }}>MERN App</NavLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

Navigation = withRouter(Navigation);

export default Navigation;