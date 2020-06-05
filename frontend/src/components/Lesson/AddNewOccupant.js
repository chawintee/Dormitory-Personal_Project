import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import './AddNewOccupant.css'
import ShowLessonInfo from './Components/ShowLessonInfo';

function AddNewOccupant(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    // const [month, setMonth] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedStatus, setSelectedStatus] = useState(1);



    const [floor, setFloor] = useState("");
    // const [roomDetail, setRoomDetail] = useState([{ Room: "101", id: '1', Name: "Oca", Surname: "OcA", Mobile: "0990200201" }, { Room: "102", id: '2', Name: "OcB", Surname: "OcB", Mobile: '0990200201' }, { Room: '103', id: '3', Name: 'OcC', Surname: 'OcC', Mobile: '0990200201' }])
    const [roomDetail, setRoomDetail] = useState([])

    const [occupantId, setOccupantId] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [occupantData, setOccupantData] = useState({});


    const fetchData = async () => {
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`);
        console.log(lessonData);
        setLessonData(lessonData.data.result);
        console.log(selectedYear);
        console.log(selectedMonth);
    }


    const fetchRoomData = async () => {
        const body = {
            Status: String(selectedStatus),
            Floor: floor,
        }
        const getRoomLiveInOccupantDataByLessonId = await axios.post(`/Room/getRoomLiveInOccupantDataByLessonId/${userInfo.id}`, body);
        // console.log("Hello")
        // console.log(getRoomLiveInOccupantDataByLessonId)
        // console.log(getRoomLiveInOccupantDataByLessonId.data.OccupantRoomData)
        setRoomDetail(getRoomLiveInOccupantDataByLessonId.data.OccupantRoomData)
        console.log(`Roomdetail = ${roomDetail.length}`)
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


    useEffect(() => {
        fetchRoomData();
    }, [lessonData, occupantData])





    // useEffect(() => {
    //     getOccupantData()
    //     // handleSelectedYear();
    // }, [occupantData])








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


    const status = ["Old", "Current"];

    const handleSelectedStatus = (e) => {
        // console.log(e.target.value)
        const StatusIndex = status.findIndex(status => status == e.target.value)
        // console.log(StatusIndex)
        setSelectedStatus(StatusIndex);
        // console.log(selectedStatus)
    }



    const genFloor = async () => {

    }



    const AddFloor = () => {
        // const add = floor.push()
        const add = [...floor, Math.max(...floor) + 1]
        // console.log(floor)
        // floor.push(6)
        setFloor(add)
    }

    const textOccupantId = (e) => {
        setOccupantId(e.target.value)
    }

    const textRoomNumber = (e) => {
        setRoomNumber(e.target.value)
    }

    const textFloor = (e) => {
        setFloor(e.target.value)
    }

    const getOccupantData = async () => {
        try {
            const result = await axios.get(`/Occupant/getOccupantById/${occupantId}`)
            console.log(result.data.LessonData);
            setOccupantData(result.data.LessonData);
        } catch{
            alert("Don't have data of occupantId")
            setOccupantData({})
            setOccupantId("")
        }
    }


    const addOccupantToRoom = async () => {
        const body = {
            RoomNumber: roomNumber,
            Floor: floor,
            LessonId: lessonData.id,
            Status: true,
            OccupantId: occupantId,
            // DateCheckIn: new Date(),
        }
        // console.log(floor)
        const data = await axios.post('/room/createRoom', body);
        console.log(data);
        setFloor("");
        setRoomNumber("");
        setOccupantId("");
        setOccupantData({});
    }

    const logLogLog = () => {
        console.log(roomDetail)
        console.log(`Roomdetail = ${roomDetail.length}`)

    }




    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            {/* This is AddNewOccupant */}
            {lessonData ?
                <ShowLessonInfo lessonData={lessonData} />
                : null}

            <hr />


            <select id="Year" onChange={handleSelectedYear} defaultValue={selectedYear} >
                {year.map(item => <option value={item}>{item}</option>)}
                {/* <option value="1950">1950</option> */}
            </select>

            <select id="Month" onChange={handleSelectedMonth} defaultValue={months[selectedMonth - 1]}>
                {months.map((item) => <option value={item}>{item}</option>)}
            </select>

            <select id="Status" onChange={handleSelectedStatus} defaultValue={status[1]}>
                {status.map((item) => <option value={item}>{item}</option>)}
            </select>

            <select id="Floor" onChange={handleSelectedMonth} defaultValue={months[selectedMonth - 1]}>
                {months.map((item) => <option value={item}>{item}</option>)}
            </select>

            <hr />


            <label><strong>Add New Occupant</strong></label>
            <table>
                <tr>
                    <th>Floor</th>
                    <th>Room</th>
                    <th>OccupantId</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Mobile</th>
                    <th>Add</th>
                </tr>
                <tr>
                    <th><input placeholder="Floor" value={floor} onChange={textFloor} ></input></th>
                    <th><input placeholder="Room Number" value={roomNumber} onChange={textRoomNumber} ></input></th>
                    <th><input placeholder="Occupant Id" value={occupantId} onChange={textOccupantId} onBlur={getOccupantData}></input></th>
                    <td>{occupantData.Name}</td>
                    <td>{occupantData.Surname}</td>
                    <td>{occupantData.Mobile}</td>
                    <th><button onClick={addOccupantToRoom}>Add</button></th>
                </tr>
            </table>

            <hr />

            <table>
                <tr>
                    <th>Floor</th>
                    <th>Room</th>
                    <th>OccupantId</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Mobile</th>
                </tr>

                {roomDetail.length > 0 ?

                    roomDetail.map(obj =>
                        <tr>
                            <td>{obj.Floor}</td>
                            <td>{obj.RoomNumber}</td>
                            {obj.Occupants.map(item =>
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
                                    <td>{item.Mobile}</td>
                                </>)}
                        </tr>
                    ) :
                    null

                }

            </table>

            <button onClick={logLogLog}>log</button>

        </div>
    )
}

export default AddNewOccupant
