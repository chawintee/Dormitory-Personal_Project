import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './component/Input';
import jwtDecode from 'jwt-decode';
import LoginForm from './component/Loginform';
import Navbar from './component/Navbar';

function Landing(props) {

    const [lesson, setLesson] = useState(false);

    const {isLogin, setIsLogin, userInfo, setUserInfo} = props;
    
    // const [isLogin, setIsLogin] = useState(false);
    // const [userInfo, setUserInfo] = useState({});
    // console.log(isLogin)

    return (
        <div>
            <Navbar/>
            <h1>Welcome to our Dorm</h1>

            <span>
                <span style={{ color: lesson ? "#FFDE17" : "#A6A6A6", fontSize: "24px" }} onClick={() => setLesson(true)}>Lesson</span>
                <span style={{ color: lesson ? "#A6A6A6" : "#FFDE17", fontSize: "24px" }} onClick={() => setLesson(false)}>Occupant</span>
            </span>

            <div>
                <LoginForm lesson={lesson} isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />
            </div>

            {lesson ?
                (<div>
                    <Link to='/RegisterLesson'>RegisterLesson</Link>
                </div>)
                :
                (<div>
                    <Link to='/RegisterOccupant'>RegisterOccupant</Link>
                </div>)
            }
            {/* <button onClick={() => console.log(`You are lesson ${lesson}`)}>Log</button> */}
            
        </div>
    )
}

export default Landing
