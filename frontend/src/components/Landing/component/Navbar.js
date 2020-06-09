import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <header>
                <nav className="NavHome">
                    <ul>
                        <li className="NavLi"><a><Link to='/'>Home</Link></a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
