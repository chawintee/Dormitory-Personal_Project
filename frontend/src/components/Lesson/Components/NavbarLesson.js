import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import './NavbarLesson.css'

function NavbarLesson(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [logout, setLogout] = useState(false)

    const logoutNow = () => {
        localStorage.removeItem("ACCESS_TOKEN_LESSON");
        setUserInfo({});
        setLogout(true)
        setIsLogin(false);
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
