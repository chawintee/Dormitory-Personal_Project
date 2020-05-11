import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './component/Input';

function Landing() {

    const [lesson, setLesson] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const textUsername = (e) => setUsername(e.target.value);
    const textPassword = (e) => setPassword(e.target.value);





    return (
        <div>
            <h1>Landing</h1>
            <span>
                <span style={{ color: lesson ? "#FFDE17" : "#A6A6A6", fontSize: "24px" }} onClick={() => setLesson(true)}>Lesson</span>
                <span style={{ color: lesson ? "#A6A6A6" : "#FFDE17", fontSize: "24px" }} onClick={() => setLesson(false)}>Occupant</span>
            </span>

            <div>
                <Input name="Username" value={username} textValue={textUsername}/>
                <Input name="Password" value={password} textValue={textPassword}/>
                <div>
                    <button>Login</button>
                </div>
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
            <button onClick={() => console.log(`You are lesson ${lesson} username is ${username} Password is ${password}`)}>Log</button>
        </div>
    )
}

export default Landing
