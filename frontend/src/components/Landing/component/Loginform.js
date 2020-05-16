import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from '../../../config/axios'
import Input from '../component/Input'


function LoginForm(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLogin, setIsLogin, userInfo, setUserInfo, lesson } = props

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
                localStorage.setItem("ACCESS_TOKEN", result.data.token);
                const user = jwtDecode(result.data.token);
                user.role = "Occupant";
                console.log(user);
                setUserInfo(user);
                setIsLogin(true);
                setUsername("");
                setPassword("");
            } catch (error){
                console.log("Invalid Username or Password")
            }
        }else {
            console.log("you are Lesson")
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
            <button onClick={() => console.log(`You are lesson ${lesson} username is ${username} Password is ${password}`)}>Log</button>
        </div>
    )
}

export default LoginForm
