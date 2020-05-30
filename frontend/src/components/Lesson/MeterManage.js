import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import ShowLessonInfo from './Components/ShowLessonInfo';
import ShowSelected from './Components/ShowSelected';
import InputPricePerUnit from './Components/InputPricePerUnit';

function MeterManage(props) {

    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    const [lessonData, setLessonData] = useState({});
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
    const [monthlyValueData, setMonthlyValueData] = useState([]);
    const [lastMonthlyValueData, setLastMonthlyValueData] = useState([]);
    const [editThisMonthEEMeter, setEditThisMonthEEMeter] = useState(false);
    const [editThisMonthWaterMeter, setEditThisMonthWaterMeter] = useState(false);


    const initialCreateMonthlyValue = async () => {
        const body = {
            Month: selectedMonth,
            Year: selectedYear,
            WaterPricePerUnit: waterPricePerUnit,
            ElectricityPricePerUnit: electricityPricePerUnit,
            RentPrice: rentPrice,
        }
        await axios.post(`/monthlyValue/initialCreate/${userInfo.id}`, body)
    }


    const fetchData = async () => {
        // console.log(userInfo.id)
        const lessonData = await axios.get(`/lesson/getLessonById/${userInfo.id}`)
        setLessonData(lessonData.data.result);
        // console.log(lessonData)
    }

    const fetchMonthlyValueData = async () => {
        const body = {
            Year: selectedYear,
            Month: selectedMonth,
        }
        const monthlyValueData = await axios.post(`/MonthlyValue/getMonthlyValueByLessonId/${userInfo.id}`, body)
        // console.log({result: monthlyValueData, lessonId : userInfo.id})
        // console.log(monthlyValueData.data.MonthlyValueByLessonId)
        const tempMonthlyValueData = monthlyValueData.data.MonthlyValueByLessonId
        const monthlyValueAddEdit = tempMonthlyValueData.map(ele => {
            return {
                ...ele,
                editThisMonthEEMeter: false,
                editThisMonthWaterMeter: false,
                editTextMonthEEMeter: "",
                editTextMonthWaterMeter: "",
            }
        })
        setMonthlyValueData(monthlyValueAddEdit);
        // setMonthlyValueData(monthlyValueData.data.MonthlyValueByLessonId)
    }

    const fetchLastMonthValueData = async () => {
        const body = {
            Year: selectedYear,
            Month: selectedMonth - 1,
        }
        const lastMonthlyValueData = await axios.post(`/MonthlyValue/getMonthlyValueByLessonId/${userInfo.id}`, body)
        setLastMonthlyValueData(lastMonthlyValueData.data.MonthlyValueByLessonId)
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
        fetchMonthlyValueData();
        fetchLastMonthValueData();
    }, [userInfo])

    useEffect(() => {
        console.log({ selectedYear, selectedMonth, electricityPricePerUnit, waterPricePerUnit, monthlyValueData, lastMonthlyValueData })
        fetchMonthlyValueData();
        fetchLastMonthValueData();
        initialCreateMonthlyValue();
    }, [selectedYear, selectedMonth])



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

    const [electricityPricePerUnit, setElectricityPricePerUnit] = useState("7");
    const [waterPricePerUnit, setWaterPricePerUnit] = useState("20");
    const [rentPrice, setRentPrice] = useState("4400")

    const handleElectricityPricePerUnit = (e) => {
        console.log(e.target.value)
        setElectricityPricePerUnit(e.target.value)
    }


    const handleWaterPricePerUnit = (e) => {
        console.log(e.target.value)
        setWaterPricePerUnit(e.target.value)
    }


    const handleRentPrice = (e) => {
        setRentPrice(e.target.value)
    }


    const showLogLog = () => {
        console.log({ monthlyValueData, lastMonthlyValueData })
    }

    const finishedAddEEMeter = (targetId) => {
        console.log(targetId)
        monthlyValueData.map((obj) => {
            
            if(obj.id == targetId){
                console.log(`OK in loop ${obj.id}`)
                obj.editThisMonthEEMeter = true
                console.log(obj)
                return obj
            }else {
                return obj
            }
        })
        console.log(monthlyValueData)
        setMonthlyValueData(monthlyValueData)
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


            <InputPricePerUnit name="Electricity price per unit" pricePerUnitValue={electricityPricePerUnit} handle={handleElectricityPricePerUnit} defaultPricePerUnit={electricityPricePerUnit} />
            <InputPricePerUnit name="Water price per unit" pricePerUnitValue={waterPricePerUnit} handle={handleWaterPricePerUnit} defaultPricePerUnit={waterPricePerUnit} />
            <InputPricePerUnit name="RentPrice/month" pricePerUnitValue={rentPrice} handle={handleRentPrice} defaultPricePerUnit={rentPrice} />

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Floor</th>
                        <th>Room</th>
                        <th>Rent/month</th>
                        <th>Last month EE meter</th>
                        <th>This month EE meter</th>
                        <th>Last month Water meter</th>
                        <th>This month Water meter</th>
                        <th>Total Rent</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyValueData.map(obj =>

                        <tr key={obj.id}>
                            <td>{obj.Room.Floor}</td>
                            <td>{obj.Room.RoomNumber}</td>
                            <td>{obj.RentPrice}</td>
                            <td>{obj.ElectricityMeter}</td>
                            {editThisMonthEEMeter ? <td><button>Hello</button></td> : <input onBlur={() => finishedAddEEMeter(obj.id)} placeholder={obj.id}></input>}
                            <td>{obj.WaterMeter}</td>
                            <td>{obj.WaterMeter}</td>
                            <td>{obj.TotalRentPrice}</td>
                        </tr>

                    )}
                </tbody>
            </table>


            <hr />
            <button onClick={showLogLog}>log</button>

        </div >
    )
}

export default MeterManage
