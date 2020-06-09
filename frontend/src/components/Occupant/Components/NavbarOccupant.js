import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import './NavbarOccupant.css'

function NavbarOccupant(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [logout, setLogout] = useState(false);

    const LogOut = () => {
        localStorage.removeItem('ACCESS_TOKEN_OCCUPANT');
        setUserInfo({});
        setIsLogin(false);
        setLogout(true)
    }

    return (
        <div>
            <header>
                <nav className="NavOccupant">
                    <ul className="ulOccupant">
                        <li className="Home"><a><Link to='/OccupantFirstPage'>Home</Link></a></li>
                        <li className="NavOccupantLi"><a onClick={LogOut}>LogOut</a></li>
                    </ul>
                </nav>
            </header>
            {
                logout ? <Redirect to='/'/> : null
            }
        </div>
    )
}

export default NavbarOccupant
