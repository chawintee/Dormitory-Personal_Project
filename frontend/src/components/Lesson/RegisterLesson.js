import React, { useState } from 'react'
import Input from './Components/Input'

function RegisterLesson() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [postcode, setPostcode] = useState("");
    const [dormPhone, setDormPhone] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const textUsername = (e) => setUsername(e.target.value);
    const textPassword = (e) => setPassword(e.target.value);
    const textConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const textName = (e) => setName(e.target.value);
    const textSurname = (e) => setSurname(e.target.value);
    const textMobile = (e) => setMobile(e.target.value);
    const textAddress = (e) => setAddress(e.target.value);
    const textProvince = (e) => setProvince(e.target.value);
    const textPostcode = (e) => setPostcode(e.target.value);
    const textDormPhone = (e) => setDormPhone(e.target.value);
    const textAccountNumber = (e) => setAccountNumber(e.target.value);







    const submit = () => {
        console.log("Submit mai kub")
    }

    const logLogLog = () => {
        console.log(username)
        console.log(password)
        console.log(confirmPassword)
        console.log(name)
        console.log(surname)
        console.log(mobile)
        console.log(address)
        console.log(province)
        console.log(postcode)
        console.log(dormPhone)
        console.log(accountNumber)
    }

    return (
        <div>
            <h1>RegisterLesson</h1>
            <Input name="Username" text={textUsername} value={username} />
            <Input name="Password" text={textPassword} value={password} />
            <Input name="Confirm Password" text={textConfirmPassword} value={confirmPassword} />
            <Input name="Name" text={textName} value={name} />
            <Input name="Surname" text={textSurname} value={surname} />
            <Input name="Mobile" text={textMobile} value={mobile} />
            <Input name="Address" text={textAddress} value={address} />
            <Input name="Province" text={textProvince} value={province} />
            <Input name="Postcode" text={textPostcode} value={postcode} />
            <Input name="Dormitory Phone Number" text={textDormPhone} value={dormPhone} />
            <Input name="Account Number" text={textAccountNumber} value={accountNumber} />



            <button onClick={submit}>Submit</button>
            <button onClick={logLogLog}>log</button>
        </div>
    )
}

export default RegisterLesson
