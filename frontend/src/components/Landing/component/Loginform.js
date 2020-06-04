import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from '../../../config/axios'
import Input from '../component/Input'
import { Redirect } from 'react-router-dom';


function LoginForm(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo, lesson } = props

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [goToOccupantFirstPage, setGoToOccupantFirstPage] = useState(false);
    const [goToLessonFirstPage, setGoToLessonFirstPage] = useState(false);

    const textUsername = (e) => setUsername(e.target.value);
    const textPassword = (e) => setPassword(e.target.value);

    const login = async () => {
        if (lesson === false) {
            const body = {
                Username: username,
                Password: password,
            };
            try {
                const result = await axios.post('/occupant/login', body);
                // console.log(result)
                localStorage.setItem("ACCESS_TOKEN_OCCUPANT", result.data.token);
                const user = jwtDecode(result.data.token);
                user.role = "Occupant";
                // console.log(user);
                setUserInfo(user);
                setIsLogin(true);
                setUsername("");
                setPassword("");
                setGoToOccupantFirstPage(true)
            } catch (error){
                alert('Invalid Username or Password');
                // console.log(error)
                // console.log("Invalid Username or Password")
            }
        }else {
            // console.log("you are Lesson")
            if(lesson === true){
                // console.log("you are Lesson")
                const body = {
                    Username: username,
                    Password: password,
                }
                try{
                    const result = await axios.post('/lesson/Login',body);
                    // console.log(result)
                    localStorage.setItem('ACCESS_TOKEN_LESSON',result.data.token)
                    const user = jwtDecode(result.data.token)
                    user.role = "Lesson";
                    // console.log(user)
                    setUserInfo(user)
                    setIsLogin(true)
                    setUsername("");
                    setPassword("");
                    setGoToLessonFirstPage(true)
                } catch (err) {
                    alert('Invalid Username or Password');
                }
                
                
            }else{
                alert("You aren't both")
                console.log("You are not both")
            }
        }
    }
    
    const logout = async () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setUserInfo({});
        setIsLogin(false);
    }



    return (
        <div>
            {isLogin ? <div>{userInfo.id}{userInfo.role}</div> : null}
            <Input name="Username" type="text" value={username} textValue={textUsername} />
            <Input name="Password" type="password" value={password} textValue={textPassword} />
            <div>
                <button onClick={login}>Login</button>
            </div>
            <div>
                {isLogin ? <button onClick={logout}>LogOut</button> : null}

            </div>
            {/* <button onClick={() => console.log(`You are lesson ${lesson} username is ${username} Password is ${password}`)}>Log</button> */}



            {goToOccupantFirstPage ? <Redirect to='/OccupantFirstPage' /> : null}
            {goToLessonFirstPage ? <Redirect to='/LessonFirstPage' /> : null}
        </div>
    )
}

export default LoginForm
