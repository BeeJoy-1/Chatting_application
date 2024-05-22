import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../../slices/authSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
        <div >

        </div>
      </div>
      <div>
        <button onClick={handleSignOut}>Logout</button>
        <p>
          {data ?
            data.displayName
            :
            <Skeleton style={{width: "200px", height: "25px"}}/>
          }
        </p>
      </div>
    </>
  )
}

export default Sidebar