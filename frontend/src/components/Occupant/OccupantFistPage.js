import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from '../../config/axios'

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
    }



    useEffect(() => {
        // console.log("Hello")
        if (localStorage.getItem("ACCESS_TOKEN_OCCUPANT")) {
            // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT")));
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT"))
            // console.log(user)
            setUserInfo(user)
            setIsLogin(true);
            // fetchData(); 
            if(user){
                console.log("object")
            }
        }
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [userInfo])



    return (
        <div>
            {/* <h1>{userInfo.id}</h1> */}
            {/* This is OccupantFistPage */}
            <span>
                <span style={{ fontSize: "20px" }}>Lesson Id: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>

                <span style={{ fontSize: "20px" }}>Name: &nbsp; </span>
                {/* <span style={{fontSize:"28px"}}>{lessonData.Name} &nbsp; {lessonData.Surname}  &nbsp;&nbsp;</span> */}
                <span style={{ fontSize: "28px" }}> &nbsp;   &nbsp;&nbsp;</span>

                <span style={{ fontSize: "20px" }}>Room: &nbsp; </span>
                <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>
            </span>
        </div>
    )
}

export default OccupantFistPage
