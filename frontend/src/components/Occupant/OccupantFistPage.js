import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom';
import ShowSelected from '../Lesson/Components/ShowSelected';

function OccupantFistPage(props) {
    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonDataFront, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())



    const fetchData = async () => {
        console.log("fetchData")
        const LessonData = await axios.get(`/Occupant/getOccupantById/${userInfo.id}`)
        // console.log(LessonData)
        // console.log(LessonData.data)
        console.log(LessonData.data.LessonData)
        setLessonData(LessonData.data.LessonData)
        // setLessonData(LessonData)
    }


    useEffect(() => {
        // console.log("Hello")
        if (localStorage.getItem("ACCESS_TOKEN_OCCUPANT")) {
            setIsLogin(true);
            // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT")));
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT"))
            // console.log(user)
            setUserInfo(user)
            // fetchData()
        }
        genYear();
    }, []);

    useEffect(() => {
        fetchData();
    }, [userInfo])

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN_OCCUPANT");
        setUserInfo({})
        setIsLogin(false)
    }



    const genYear = () => {
        const nowYear = new Date().getFullYear();
        console.log(nowYear)
        const ArrYear = [];
        for (let i = nowYear; i >= nowYear - 100; i--) {
            // console.log(i)
            ArrYear.push(i)
        }
        setYear(ArrYear)
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSelectedMonth = (e) => {
        // console.log(e.target.value);
        const numberMonth = months.findIndex(ele => ele == e.target.value) + 1;
        // console.log(numberMonth);
        setSelectedMonth(numberMonth);
    }

    

    const handleSelectedYear = (e) => {
        // console.log(e.target.value)
        setSelectedYear(e.target.value)
    }



    const logLogLog = () => {
        console.log({ year,selectedYear, selectedMonth })
        // console.log(new Date().getFullYear())
        // console.log(new Date().getMonth()   )
    }

    return (
        <div>
            {/* <h1>{userInfo.id}</h1> */}
            {/* This is OccupantFistPage */}
            <span>
                <span style={{ fontSize: "20px" }}>Occupant Id: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>
                <span style={{ fontSize: "20px" }}>Name: &nbsp; </span>

                {/* <span style={{fontSize:"28px"}}>{lessonData.Name} &nbsp; {lessonData.Surname}  &nbsp;&nbsp;</span> */}
                {lessonDataFront ? <span style={{ fontSize: "28px" }}>{lessonDataFront.Name} &nbsp; {lessonDataFront.Surname}  &nbsp;&nbsp;</span> : null}
                {/* <span style={{ fontSize: "28px" }}> {lessonDataFront.data.LessonData.Name} &nbsp;   &nbsp;&nbsp;</span> */}

                <span style={{ fontSize: "20px" }}>Room: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>
            </span>

            <hr />

            <ShowSelected handle={handleSelectedYear} defaultValue={selectedYear} arrValue={year} />
            <ShowSelected handle={handleSelectedMonth} defaultValue={months[selectedMonth - 1]} arrValue={months} />

            <hr />








            <hr />
            <div>
                <button onClick={logout}>Log Out</button>
            </div>


            <button onClick={logLogLog}>Log</button>

            {isLogin || lessonDataFront ? null : <Redirect to='/' />}
        </div>
    )
}

export default OccupantFistPage
