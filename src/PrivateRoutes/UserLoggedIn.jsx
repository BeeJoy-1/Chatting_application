import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../Pages/Authorization/Login'
import { Outlet } from 'react-router-dom'

const UserLoggedIn = () => {
    
    const data = useSelector((state) => state.LoggedInUserData.value)

  return data ? <Outlet/> : <Login/> 

}

export default UserLoggedIn