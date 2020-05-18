import React,{useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'

function AddNewOccupant(props) {
    const {isLogin,setIsLogin,userInfo,setUserInfo} = props;

    useEffect(() => {
        if(localStorage.getItem("ACCESS_TOKEN_LESSON")){
            // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON")))
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN_LESSON"))
            setUserInfo(user)
            setIsLogin(true)
        }
    }, [])

    return (
        <div>
            This is AddNewOccupant
        </div>
    )
}

export default AddNewOccupant
