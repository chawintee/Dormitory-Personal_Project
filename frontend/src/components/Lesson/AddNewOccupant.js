import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import './AddNewOccupant.css'

function AddNewOccupant(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    // const [month, setMonth] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const [floor, setFloor] = useState([1]);
    const [roomDetail, setRoomDetail] = useState([{ Room: "101",id: '1' ,Name: "Oca", Surname: "OcA", Mobile: "0990200201" }, { Room: "102",id: '2', Name: "OcB", Surname: "OcB", Mobile: '0990200201' }, { Room: '103',id: '3', Name: 'OcC', Surname: 'OcC', Mobile: '0990200201' }])



    const fetchData = async () => {
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`);
        console.log(lessonData)
        setLessonData(lessonData.data.result)
        console.log(selectedYear);
        console.log(selectedMonth);
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
        fetchData();
        genYear();
    }, [userInfo])

    useEffect(() => {
        console.log(selectedYear)
        console.log(selectedMonth)
        // handleSelectedYear();
    }, [selectedYear])








    const genYear = () => {
        const year = []
        for (let i = new Date().getFullYear(); i > 1950; i--) {
            year.push(i)
        }
        setYear(year);
    }

    const handleSelectedYear = (e) => {
        // console.log(e.target.value)
        setSelectedYear(e.target.value)
        // console.log(selectedYear)
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSelectedMonth = (e) => {
        console.log(e.target.value)
        const monthIndex = months.findIndex(months => months === e.target.value);
        console.log(monthIndex)
        const monthValue = monthIndex + 1;
        console.log(monthValue);
        setSelectedMonth(monthValue)
    }

    const AddFloor = () => {
        // const add = floor.push()
        const add = [...floor, Math.max(...floor) + 1]
        // console.log(floor)
        // floor.push(6)
        setFloor(add)
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


            <hr />


            <select id="Year" onChange={handleSelectedYear} defaultValue={selectedYear} >
                {year.map(item => <option value={item}>{item}</option>)}
                {/* <option value="1950">1950</option> */}
            </select>

            <select id="Month" onChange={handleSelectedMonth} defaultValue={months[selectedMonth - 1]}>
                {months.map((item) => <option value={item}>{item}</option>)}
            </select>


            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Floor</th>
                        <th>Room Detail</th>
                        {/* <th>Name</th>
                        <th>Surname</th>
                        <th>Mobile</th> */}
                    </tr>
                </thead>
                <tbody>
                    {floor.map(item =>
                        <tr>
                            <td>{item}</td>
                                <tr>
                                    <th>Room</th>
                                    <th>Occupant Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Mobile</th>
                                </tr>
                                <tr>
                                    <th><input></input></th>
                                    <th><input></input></th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Mobile</th>
                                </tr>
                            {roomDetail.map(occupant =>
                                <tbody>
                                    <tr>
                                        <td>{occupant.Room}</td>
                                        <td>{occupant.id}</td>
                                        <td>{occupant.Name}</td>
                                        <td>{occupant.Surname}</td>
                                        <td>{occupant.Mobile}</td>
                                    </tr>
                                </tbody>
                                )}
                            {/* <td>{item}</td>
                             <td>{item}</td>
                             <td>{item}</td>
                             <td>{item}</td> */}
                        </tr>
                    )}


                </tbody>
            </table>

            <button onClick={AddFloor}>Add Floor</button>




        </div>
    )
}

export default AddNewOccupant
