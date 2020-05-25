import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import ShowLessonInfo from './Components/ShowLessonInfo';

function MeterManage(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())


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
        genYear();
    }, [])

    useEffect(() => {
        fetchData();
    }, [userInfo])



    const genYear = () => {
        const nowYear = new Date().getFullYear();
        // console.log(nowYear)
        for (let i = nowYear; i > nowYear - 100; i--) {
            year.push(i);
        }
        // console.log(year)
        setYear(year)
        // console.log(selectedYear)
    }

    const handleSelectedYear = (e) => {
        // console.log(e.target.value)
        setSelectedYear(e.target.value)
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




    return (
        <div>
            This is MeterManage
            {lessonData ?
                <ShowLessonInfo lessonData={lessonData} />
                :
                null
            }
            <hr />

            {year ?
                <select id="year" onChange={handleSelectedYear}>
                    {year.map(item => <option key={item} value={item}>{item}</option>)}
                </select>

                :
                null

            }
        </div>
    )
}

export default MeterManage
