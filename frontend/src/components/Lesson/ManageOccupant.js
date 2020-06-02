import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import ShowLessonInfo from './Components/ShowLessonInfo';
import ShowSelected from './Components/ShowSelected';

function ManageOccupant(props) {


    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [monthlyValueData, setMonthlyValueData] = useState([]);
    const [pushButton, setPushButton] = useState(false)

    const fetchData = async () => {
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`);
        setLessonData(lessonData.data.result);
        // const useLessonData = lessonData.data.result;
        // console.log(lessonData.data.result)
    }

    const fetchDataMonthlyValue = async () => {
        const body = {
            Year: selectedYear,
            Month: selectedMonth,
        }
        const MonthlyValue = await axios.post(`/monthlyValue/getMonthlyValueByLessonId/${userInfo.id}`, body)
        console.log(MonthlyValue.data.MonthlyValueByLessonId)
        setMonthlyValueData(MonthlyValue.data.MonthlyValueByLessonId)
    }











    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN_LESSON')) {
            // console.log("Have ACCESS_TOKEN_LESSON");
            const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN_LESSON'));
            // console.log(user)
            setIsLogin(true);
            setUserInfo(user);
        }
        genYear();
    }, [])

    useEffect(() => {
        fetchData();
        fetchDataMonthlyValue();
    }, [userInfo])

    useEffect(()=>{
        fetchDataMonthlyValue();
    },[pushButton, selectedMonth, selectedYear])






    const genYear = () => {
        const thisYear = new Date().getFullYear();
        console.log(thisYear);
        const genThisYear = [];
        for (let i = thisYear; i >= (thisYear - 100); i--) {
            genThisYear.push(i);
            // console.log(i);
        }
        setYear(genThisYear);
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSelectedYear = (e) => {
        // console.log(e.target.value)
        setSelectedYear(e.target.value);
    }

    const handleSelectedMonth = (e) => {
        // console.log(e.target.value)
        const NumberMonth = months.findIndex(item => item == e.target.value) + 1;
        // console.log(NumberMonth);
        setSelectedMonth(NumberMonth);
    }

    const PaidStatusToggle = (targetId) => {
        console.log(targetId)
        monthlyValueData.map(async (ele) => {
            if (ele.id == targetId) {
                const body = {
                    PaidDate: new Date(),
                    PaidStatus: !ele.PaidStatus
                }
                await axios.patch(`/MonthlyValue//editSomeValue/${targetId}`,body)
                setPushButton(!pushButton);
            }
        })
        setPushButton(!pushButton);
    }












    const logLogLog = () => {
        console.log({ userInfo, lessonData, selectedMonth, selectedYear });
        // genYear();
        // console.log(year)
        // console.log(new Date().getMonth() + 1)
        console.log(new Date());
        const hello = monthlyValueData.map(ele => console.log(typeof(ele.PaidDate)))
    }





    return (
        <div>
            {/* <div>Hello ManageOccupant</div> */}
            {lessonData ? <ShowLessonInfo lessonData={lessonData} /> : null}
            <hr />

            <ShowSelected handle={handleSelectedYear} defaultValue={selectedYear} arrValue={year} />
            <ShowSelected handle={handleSelectedMonth} defaultValue={months[selectedMonth - 1]} arrValue={months} />

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Floor</th>
                        <th>Room</th>
                        <th>Electricity Price</th>
                        <th>Water Price</th>
                        <th>Total Rent Price</th>
                        <th>Paid Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                {monthlyValueData
                    ?
                    <tbody>
                        {monthlyValueData.map(obj =>
                            <tr key={obj.id}>
                                <td>{obj.Room.Floor}</td>
                                <td>{obj.Room.RoomNumber}</td>
                                <td>{obj.ElectricityPrice}</td>
                                <td>{obj.WaterPrice}</td>
                                <td>{obj.TotalRentPrice}</td>
                                <td>{obj.PaidDate}</td>
                                <td>{obj.PaidStatus ? <span>Paid</span> : <span>Waiting</span>}</td>
                                <td><button onClick={() => PaidStatusToggle(obj.id)}>Paid</button></td>
                            </tr>
                        )}

                    </tbody>
                    :
                    null
                }
            </table>



            <hr />
            <button onClick={logLogLog}>Log</button>
        </div>
    )
}

export default ManageOccupant
