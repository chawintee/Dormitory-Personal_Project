import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import ShowLessonInfo from './Components/ShowLessonInfo';

function MeterManage(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    const [lessonData, setLessonData] = useState({})

    const fetchData = async () => {
        // console.log(userInfo.id)
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`)
        setLessonData(lessonData.data.result);
        // console.log(lessonData)
    }

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN_LESSON")) {
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON"))
            // console.log(user)
            setIsLogin(true)
            setUserInfo(user)
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [userInfo])




    return (
        <div>
            This is MeterManage
            {lessonData ?
                <ShowLessonInfo lessonData={lessonData} />
                :
                null
            }
            <hr/>
        </div>
    )
}

export default MeterManage
