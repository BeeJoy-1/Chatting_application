import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../../slices/authSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './layout.css'
import { Avatar } from '@mui/material';
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";


const Sidebar = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const data = useSelector((state) => state.LoggedInUserData.value)
  // console.log(data.displayName);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      localStorage.removeItem("LoggedInUser")
      dispatch(incrementByAmount(null))
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <div className='sidebarmain'>
        <div className='sidebar_inner'>
          <div className='sidebar_avater'>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 90, height: 90 }}
            />
          </div>
          {/* <p>
            {data ?
              data.displayName
              :
              <Skeleton style={{width: "200px", height: "25px"}}/>
            }
          </p> */}
          <div style={{}}>
            <ul className='sidebar_ul'>
              <li>
                <NavLink to='/Home'>
                  <IoHomeOutline />
                </NavLink>
              </li>
              <li>
                <NavLink to='/Message'>
                  <AiOutlineMessage />
                </NavLink>
              </li>
              <li>
                <NavLink to='/Notification'>
                  <IoMdNotificationsOutline />
                </NavLink>
              </li>
              <li>
                <NavLink to='/Settings'>
                  <IoSettingsOutline  />
                </NavLink>
              </li>
            </ul>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '15px'}}>
            <button onClick={handleSignOut} className='side_out'>Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar