import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom';
import ShowSelected from '../Lesson/Components/ShowSelected';
import NavbarOccupant from './Components/NavbarOccupant';

function OccupantFistPage(props) {
    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [occupantData, setOccupantData] = useState({});
    const [lessonData, setLessonData] = useState({});
    const [roomData, setRoomData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [monthlyValueData, setMonthlyValueData] = useState({})
    
    
    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN_OCCUPANT")) {
            setIsLogin(true);
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_OCCUPANT"))
            setUserInfo(user)
        }
        genYear();
    }, []);
    
    
    
    const fetchData = async () => {
        try{
            const occupantData = await axios.get(`/Occupant/get/${userInfo.id}`)
            setOccupantData(occupantData.data.occupantData)
        } catch (error) {
            console.log(error)
        }
    }


    const fetchLessorData = async () => {
        try{
            const LessorData = await axios.get(`/lessor/data/${userInfo.id}`);
            setLessonData(LessorData.data.lessonData);
            setRoomData(LessorData.data.RoomData);
        } catch (error) {
            console.log(error)
        }
    }


    const fetchMonthlyValueData = async () => {
        const body = {
            Year: selectedYear,
            Month: selectedMonth,
        }
        try{
            const monthlyValueData = await axios.post(`MonthlyValue/getMonthlyValueDataByYearMonthOccupantId/${userInfo.id}`, body);
            setMonthlyValueData(monthlyValueData.data.MonthlyValueData);
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchData();
        fetchLessorData();
        fetchMonthlyValueData();
    }, [userInfo])

    useEffect(() => {
        fetchMonthlyValueData();
    }, [selectedMonth, selectedYear])

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN_OCCUPANT");
        setUserInfo({})
        setOccupantData({})
        setIsLogin(false)
    }



    const genYear = () => {
        const nowYear = new Date().getFullYear();
        const ArrYear = [];
        for (let i = nowYear; i >= nowYear - 100; i--) {
            ArrYear.push(i)
        }
        setYear(ArrYear)
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSelectedMonth = (e) => {
        const numberMonth = months.findIndex(ele => ele == e.target.value) + 1;
        setSelectedMonth(numberMonth);
    }



    const handleSelectedYear = (e) => {
        setSelectedYear(e.target.value)
    }

    const logHello = () => {
        console.log(occupantData.Name)
    }


    const logLogLog = () => {
        console.log({ year, selectedYear, selectedMonth, lessonData })
    }

    return (
        <div>
            <NavbarOccupant  isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />
            <div>
                <span>
                    <span style={{ fontSize: "20px" }}>Occupant Id: &nbsp; </span>
                    <span style={{ fontSize: "28px" }}>{userInfo.id}   &nbsp;&nbsp;</span>
                    <span style={{ fontSize: "20px" }}>Name: &nbsp; </span>
                    {occupantData ? <span style={{ fontSize: "28px" }}>{occupantData.Name} &nbsp; {occupantData.Surname}  &nbsp;&nbsp;</span> : null}
                    <span style={{ fontSize: "20px" }}>Room: &nbsp; </span>
                    {roomData ? <span style={{ fontSize: "28px" }}>{roomData.RoomNumber}   &nbsp;&nbsp;</span> : null}
                </span>
            </div>
            <div>
                <span>
                    <span style={{ fontSize: "20px" }}>Your Lessor Id: &nbsp; </span>
                    {lessonData ? <span style={{ fontSize: "28px" }}>{lessonData.id}   &nbsp;&nbsp;</span> : null}
                    <span style={{ fontSize: "20px" }}>Your Dormitory Name : &nbsp; </span>
                    {lessonData ? <span style={{ fontSize: "28px" }}>{lessonData.DormitoryName}</span> : null}
                </span>
            </div>



            <hr />

            <ShowSelected handle={handleSelectedYear} defaultValue={selectedYear} arrValue={year} />
            <ShowSelected handle={handleSelectedMonth} defaultValue={months[selectedMonth - 1]} arrValue={months} />

            <hr />
            <span>
                {monthlyValueData ?
                    <>
                        <span>Total rent :<strong>{monthlyValueData.TotalRentPrice}</strong> </span>
                        {monthlyValueData.PaidStatus ? <span style={{ color: "Blue" }}>&nbsp;&nbsp;&nbsp;&nbsp;Paid</span> : <span style={{ color: "red" }}>&nbsp;&nbsp;&nbsp;&nbsp;Waiting</span>}
                    </>
                    :
                    null
                }
            </span>
            <br/>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Unit</th>
                        <th>Change</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {monthlyValueData ?
                        <>
                            <tr>
                                <td>Rent </td>
                                <td>{monthlyValueData.RentPrice / monthlyValueData.RentPrice}</td>
                                <td>{monthlyValueData.RentPrice}</td>
                                <td>{monthlyValueData.RentPrice}</td>
                            </tr>
                            <tr>
                                <td>Electricity </td>
                                <td>{monthlyValueData.ElectricityPrice / monthlyValueData.ElectricityPricePerUnit}</td>
                                <td>{monthlyValueData.ElectricityPricePerUnit}</td>
                                <td>{monthlyValueData.ElectricityPrice}</td>
                            </tr>
                            <tr>
                                <td>Water </td>
                                <td>{monthlyValueData.WaterPrice / monthlyValueData.WaterPricePerUnit}</td>
                                <td>{monthlyValueData.WaterPricePerUnit}</td>
                                <td>{monthlyValueData.WaterPrice}</td>
                            </tr>
                        </>
                        :


                        null}

                </tbody>


            </table>

            <hr />
            <div>
                {/* <button onClick={logout}>Log Out</button> */}
            </div>


            {/* <button onClick={logLogLog}>Log</button> */}

            {isLogin || occupantData ? null : <Redirect to='/' />}
        </div>
    )
}

export default OccupantFistPage
