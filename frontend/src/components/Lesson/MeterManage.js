import React,{useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode'

function MeterManage(props) {
    const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

    const fetchData = () => {
        console.log("object")
    }

    useEffect(()=>{
        if(localStorage.getItem("ACCESS_TOKEN_LESSON")){
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON"))
            // console.log(user)
            setIsLogin(true)
            setUserInfo(user)
        }
    },[])




    return (
        <div>

            This is MeterManage
        </div>
    )
}

export default MeterManage
