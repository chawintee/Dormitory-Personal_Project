import React, { useState } from 'react';
import Input from './Components/Input';
import axios from '../../config/axios';
import {Redirect} from 'react-router-dom';
import Navbar from '../Landing/component/Navbar';

function RegisterLesson() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dormName, setDormName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [postcode, setPostcode] = useState("");
    const [dormPhone, setDormPhone] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [go, setGo] = useState(false)


    const [checkUsernameSame, setCheckUsernameSame] = useState(false);
    const [checkPasswordConfirmPassword, setCheckPasswordConfirmPassword] = useState(true);







    const textUsername = (e) => setUsername(e.target.value);
    const textPassword = (e) => setPassword(e.target.value);
    const textConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const textName = (e) => setName(e.target.value);
    const textSurname = (e) => setSurname(e.target.value);
    const textMobile = (e) => setMobile(e.target.value);
    const textDormName = (e) => setDormName(e.target.value);
    const textAddress = (e) => setAddress(e.target.value);
    const textProvince = (e) => setProvince(e.target.value);
    const textPostcode = (e) => setPostcode(e.target.value);
    const textDormPhone = (e) => setDormPhone(e.target.value);
    const textAccountNumber = (e) => setAccountNumber(e.target.value);


    const submit = async () => {
        // console.log("Submit mai kub")
        if (username && password && confirmPassword && name && surname && mobile && address && province && postcode && dormPhone && accountNumber) {
            // console.log("OK")
            if (password !== confirmPassword) {
                alert("Please correct your Password and Confirm Password same");
            } else {
                const body = {
                    Username: username,
                    Password: password,
                    Name: name,
                    Surname: surname,
                    Mobile: mobile,
                    Address: address,
                    Photo: province,
                    DormitoryPhone: dormPhone,
                    DormitoryName:dormName,
                    Province: province,
                    PostCode: postcode,
                    BookAccount: accountNumber,
                }

                
                try {
                    const result = await axios.post('/lesson/register',body);
                    // console.log(result)
                    alert(result.data.message);
                    alert(`Your id is ${result.data.users.id}`);
                    setGo(true)
                } catch {
                    alert("Please Register again")
                    // console.log("Please Register again")
                    setGo(false)
                }

            }
        } else {
            // console.log("Please Enter ...");
            // alert("Please Enter ...");
            if(!username){
                alert("Please Enter ");
            }
            if(!password){
                alert("Please Enter ");
            }
            if(!confirmPassword){
                alert("Please Enter confirmPassword");
            }
            if(!name){
                alert("Please Enter name");
            }
            if(!surname){
                alert("Please Enter surname");
            }
            if(!dormName){
                alert("Please Enter dormName");
            }
            if(!mobile){
                alert("Please Enter mobile");
            }
            if(!address){
                alert("Please Enter address");
            }
            if(!province){
                alert("Please Enter province");
            }
            if(!postcode){
                alert("Please Enter postcode");
            }
            if(!dormPhone){
                alert("Please Enter dormPhone");
            }
            if(!accountNumber){
                alert("Please Enter accountNumber");
            }
        }
    }


    const checkUsername = async () => {
        const body = {
            Username: username,
        }
        try {
            const result = await axios.post('/Lesson/checkUsername', body);
            // console.log(result.data.message)
            setCheckUsernameSame(false)
        } catch {
            // console.log("Invalid Username")
            setCheckUsernameSame(true)
        }
    }

    const checkConfirmPassword = () => {
        if (password === confirmPassword) {
            setCheckPasswordConfirmPassword(true)
        } else {
            setCheckPasswordConfirmPassword(false)
        }
    }

    const logLogLog = () => {
        console.log(username)
        console.log(password)
        console.log(confirmPassword)
        console.log(name)
        console.log(surname)
        console.log(mobile)
        console.log(dormName)
        console.log(address)
        console.log(province)
        console.log(postcode)
        console.log(dormPhone)
        console.log(accountNumber)
    }

    return (
        <div>
            <Navbar/>
            <h1>RegisterLessor</h1>
            <Input name="Username" type="text" text={textUsername} value={username} check={checkUsername} />{checkUsernameSame ? <div style={{ color: "red" }}>Invalid Username</div> : null}
            <Input name="Password" type="password" text={textPassword} value={password} check={checkConfirmPassword} />
            <Input name="Confirm Password" type="password" text={textConfirmPassword} value={confirmPassword} check={checkConfirmPassword} />{checkPasswordConfirmPassword ? null : <div style={{color: "red"}}>Password and Confirm Password are not same</div>}
            <Input name="Name" type="text" text={textName} value={name} />
            <Input name="Surname" type="text" text={textSurname} value={surname} />
            <Input name="Mobile" type="text" text={textMobile} value={mobile} />
            <Input name="Dormitory Name" type="text" text={textDormName} value={dormName} />
            <Input name="Address" type="text" text={textAddress} value={address} />
            <Input name="Province" type="text" text={textProvince} value={province} />
            <Input name="Postcode" type="text" text={textPostcode} value={postcode} />
            <Input name="Dormitory Phone Number" type="text" text={textDormPhone} value={dormPhone} />
            <Input name="Account Number" type="text" text={textAccountNumber} value={accountNumber} />



            <button onClick={submit}>Submit</button>
            <button onClick={logLogLog}>log</button>


           {go ? <Redirect to='/'/> : null}
        </div>
    )
}

export default RegisterLesson
