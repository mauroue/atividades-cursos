import React from 'react';
import logo from '../img/world-logo.svg'

export default function header() {
    return (
        <header className="header-bar">
            <img src={logo} alt="logo of world globe" />
            <h4 className="header--text">.my travel journal</h4>
        </header>
    )
}