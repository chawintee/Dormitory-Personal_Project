import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import './NavbarLesson.css'

function NavbarLesson() {

    const [logout, setLogout] = useState(false)

    const logoutNow = () => {
        setLogout(true)
    }

    

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a><Link to='/LessonFirstPage'>Home</Link></a></li>
                        <li><a><Link to='/AddNewOccupant'>Add Occupant</Link></a></li>
                        <li><a><Link to='/MeterManage'>Meter Management</Link></a></li>
                        <li><a><Link to='/OccupantMange'>Occupant Management</Link></a></li>
                        <li><a onClick={logoutNow}>Log out</a></li>
                    </ul>
                </nav>
            </header>

            {logout ? <Redirect to='/'/> : null}



        </div>
    )
}

export default NavbarLesson
