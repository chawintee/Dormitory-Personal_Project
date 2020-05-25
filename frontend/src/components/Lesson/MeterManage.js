import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import ShowLessonInfo from './Components/ShowLessonInfo';
import ShowSelected from './Components/ShowSelected';

function MeterManage(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectMonth] = useState(new Date().getMonth() + 1);


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
        // console.log({ selectedYear, selectedMonth})
    }, [])

    useEffect(() => {
        fetchData();
    }, [userInfo])

    useEffect(()=> {
        console.log({selectedYear, selectedMonth})
    },[selectedYear])



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

    const handleSelectedMonth = (e) => {
        // console.log(e.target.value)
        const monthIndex = months.findIndex(item => item == e.target.value) + 1;
        // console.log(monthIndex);
        setSelectMonth(monthIndex)
    }



    return (
        <div>
            This is MeterManage
            {lessonData ?
                <ShowLessonInfo lessonData={lessonData} />
                :
                null
            }
            <hr />

            <ShowSelected handle={handleSelectedYear} defaultValue={selectedYear} arrValue={year} />
            <ShowSelected handle={handleSelectedMonth} defaultValue={months[selectedMonth - 1]} arrValue={months} />


            {/* <select id="year" onChange={handleSelectedYear} defaultValue={selectedYear}>
                {year.map(item => <option key={item} value={item}>{item}</option>)}
            </select> */}

            {/* <select id="month" onChange={handleSelectedMonth} defaultValue={months[selectedMonth - 1]}>
                {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select> */}


        </div >
    )
}

export default MeterManage
