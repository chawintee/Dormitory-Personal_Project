import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#"><Link to='/error'>Home</Link></a></li>
                        {/* <li><a class="active" href="#">Tutorials</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Contact</a></li> */}
                    </ul>
                </nav>
            </header>
            {/* <ul>
                <li ><Link to='/error'><h5>Home</h5></Link></li>
            </ul> */}
        </div>
    )
}

export default Navbar
