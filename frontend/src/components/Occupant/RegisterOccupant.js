import React, { useState } from 'react'
import Input from './Components/Input'

function RegisterOccupant() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")


    const textUsername = e => setUsername(e.target.value);
    const textPassword = e => setPassword(e.target.value);
    const textConfirmPassword = e => setConfirmPassword(e.target.value);
    const textName = e => setName(e.target.value);
    const textSurname = e => setSurname(e.target.value);
    const textMobile = e => setMobile(e.target.value);
    const textAddress = e => setAddress(e.target.value);







    const submit = () => {

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
            <h1>RegisterOccupant</h1>
            <Input name="Username" text={textUsername} value={username} />
            <Input name="Password" text={textPassword} value={password} />
            <Input name="Confirm Password" text={textConfirmPassword} value={confirmPassword} />
            <Input name="Name" text={textName} value={name} />
            <Input name="Surname" text={textSurname} value={surname} />
            <Input name="Mobile" text={textMobile} value={mobile} />
            <div>
                <div><label>Address</label></div>
                <textarea onChange={textAddress} value={address} placeholder={"Address"}></textarea>
            </div>

            <button onClick={submit}>Submit</button>
            <button onClick={logLogLog}>Log</button>
        </div>
    )
}

export default RegisterOccupant
