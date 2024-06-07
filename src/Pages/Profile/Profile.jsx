import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Profile.css"
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

    const { id } = useParams();
    const db = getDatabase();
    const data = useSelector((state) => state.LoggedInUserData.value)
    const [ProfileUser, setProfileUser] = useState([])

    useEffect(()=> {
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item) => {
            if(item.key == id){
              arr.push({...item.val(), id: item.key})
            }
          })
          setProfileUser(arr)
        });
      },[])

  return (
    <div>
        <div className='cover_img'></div>
        <div className='top'>
            <div className='profile_img'></div>
            <div className='name'>
                <h3>{ProfileUser[0]?.displayName}</h3>
                <p>NIGGER</p>
            </div>
        </div>
    </div>
)
// <div>Profile id: {id}</div>
}

export default Profile