import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'

function AddNewOccupant(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);


    const fetchData = async () => {
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`);
        console.log(lessonData)
        setLessonData(lessonData.data.result)
    }

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN_LESSON")) {
            // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON")))
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON"))
            setIsLogin(true)
            setUserInfo(user)
        }
    }, [])

    useEffect(() => {
        fetchData()
        genYear()
    }, [userInfo])


    const genYear = () => {
        const year = []
        for(let i= new Date().getFullYear() ;i>1950 ;i--){
            year.push(i)
        }
        setYear(year);
    }



    return (
        <div>
            {/* This is AddNewOccupant */}
            {lessonData ? <> 
            <span>
                <span>Lesson id : </span><span>{lessonData.id}</span>
                <span>Dormitory Name : </span><span>{lessonData.DormitoryName}</span>
            </span>
            <div><span>Owner : </span><span>{lessonData.Name} {lessonData.Surname}</span></div>
            </>
             : null}

             <hr/>


             <select id="Year"> 
                {year.map(item=><option value={item}>{item}</option>)}
                {/* <option value="1950">1950</option> */}
             </select>
            

        </div>
    )
}

export default AddNewOccupant
