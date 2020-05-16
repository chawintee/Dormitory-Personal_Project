import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom';

function OccupantFistPage(props) {
    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonDataFront, setLessonData] = useState({});

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
            // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT")));
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT"))
            // console.log(user)
            setUserInfo(user)
            setIsLogin(true);
            // fetchData()
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [userInfo])

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN_OCCUPANT");
        setUserInfo({})
        setIsLogin(false)
    }



    return (
        <div>
            {/* <h1>{userInfo.id}</h1> */}
            {/* This is OccupantFistPage */}
            <span>
                <span style={{ fontSize: "20px" }}>Lesson Id: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>

                <span style={{ fontSize: "20px" }}>Name: &nbsp; </span>

                {/* <span style={{fontSize:"28px"}}>{lessonData.Name} &nbsp; {lessonData.Surname}  &nbsp;&nbsp;</span> */}
                {lessonDataFront ? <span style={{fontSize:"28px"}}>{lessonDataFront.Name} &nbsp; {lessonDataFront.Surname}  &nbsp;&nbsp;</span> : null}
                {/* <span style={{ fontSize: "28px" }}> {lessonDataFront.data.LessonData.Name} &nbsp;   &nbsp;&nbsp;</span> */}

                <span style={{ fontSize: "20px" }}>Room: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>


                <button onClick={logout}>Log Out</button>
                {isLogin ? null :<Redirect to='/'/>}
            </span>
        </div>
    )
}

export default OccupantFistPage
