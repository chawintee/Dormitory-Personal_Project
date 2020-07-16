import React, { useState } from 'react'
import Input from './Components/Input'
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'
import Navbar from '../Landing/component/Navbar'

function RegisterOccupant() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [checkPass, setCheckPass] = useState(false);
    const [checkUsernameSt, setUsernameSt] = useState(false);
    const [go, setGo] = useState(false);



    const textUsername = e => setUsername(e.target.value);
    const textPassword = e => setPassword(e.target.value);
    const textConfirmPassword = e => setConfirmPassword(e.target.value);
    const textName = e => setName(e.target.value);
    const textSurname = e => setSurname(e.target.value);
    const textMobile = e => setMobile(e.target.value);
    const textAddress = e => setAddress(e.target.value);







    const submit = async () => {
        // const targetId = 2;
        // const result = await axios.get(`/occupant/getOccupantById/${targetId}`)
        // console.log(result.data)

        if (username && password && confirmPassword && name && surname && mobile && address) {
            if (password !== confirmPassword) {
                alert("your password and confirm password not match");
                setCheckPass(true)
            } else {
                setCheckPass(false)
                const body = {
                    Username: username,
                    Password: password,
                    Name: name,
                    Surname: surname,
                    Mobile: mobile,
                    Address: address,
                    // Photo: photo,
                }
                try {
                    const result = await axios.post('/occupant/register', body);
                    // console.log(result.data)
                    alert(result.data.message)
                    alert(`Your id is ${result.data.result.id}`)
                    setGo(true)
                } catch {
                    alert("Cannot Register")
                }
                // alert("OK")
            }
        } else {
            if (!username) {
                alert("Please Enter your Username")
            }
            if (!password) {
                alert("Please Enter your Password")
            }
            if (!confirmPassword) {
                alert("Please Enter your Confirm Password")
            }
            if (!name) {
                alert("Please Enter your Name")
            }
            if (!surname) {
                alert("Please Enter your Surname")
            }
            if (!mobile) {
                alert("Please Enter your Mobile")
            }
            if (!address) {
                alert("Please Enter your Address")
            }
        }

    }



    const checkThisPassword = () => {
        if (password !== confirmPassword) {
            // alert("your password and confirm password not match");
            setCheckPass(true)
        } else {
            setCheckPass(false)
        }
    }


    const checkUserName = async () => {
        const body = {
            username,
        }
        try {
            const result = await axios.post(`/occupant/checkUsername`, body);
            // console.log(result.data)
            if (result.data) {
                setUsernameSt(false)
            }
        } catch {
            setUsernameSt(false)
        }
    }





    const logLogLog = () => {
        console.log(username)
        console.log(password)
        console.log(confirmPassword)
        console.log(name)
        console.log(surname)
        console.log(mobile)
        console.log(address)
    }


    return (
        <div>
            <Navbar/>
            <h1>RegisterOccupant</h1>
            <form>
                <Input name="Username" text={textUsername} value={username} type="text" onblur={checkUserName} />{checkUsernameSt ? <div style={{ color: "red" }}>Invalid your username</div> : null}
                <Input name="Password" text={textPassword} value={password} type="password" onblur={checkThisPassword} />
                <Input name="Confirm Password" text={textConfirmPassword} value={confirmPassword} type="password" onblur={checkThisPassword} />{checkPass ? <div style={{ color: "red" }}>your password and confirm password are not match</div> : null}
                <Input name="Name" text={textName} value={name} type="text" />
                <Input name="Surname" text={textSurname} value={surname} type="text" />
                <Input name="Mobile" text={textMobile} value={mobile} type="text" />
            </form>
            <div>
                <div><label>Address</label></div>
                <textarea onChange={textAddress} value={address} placeholder={"Address"}></textarea>
            </div>

            <button onClick={submit}>Submit</button>
            <button onClick={logLogLog}>Log</button>

            {go ? <Redirect to='/'/> : null}
        </div>
    )
}

export default RegisterOccupant
