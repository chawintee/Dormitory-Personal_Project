import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLesson from './Components/NavbarLesson'

function LessonFirstPage(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    return (
        <div>
            <NavbarLesson isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />
            <h1>This is LessonFirstPage</h1>
            <div><Link to='/AddNewOccupant'> Add New Occupants </Link></div>
            <div><Link to='/MeterManage'> Meter Manage </Link></div>
            <div><Link to='/OccupantMange'>Occupant Management</Link></div>
        </div>
    )
}

export default LessonFirstPage 
