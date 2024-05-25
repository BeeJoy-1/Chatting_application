import React, { useEffect, useState } from 'react'
import UserList from '../../Components/home/UserList'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const FriendRequest = () => {

    const data = useSelector((state) => state.LoggedInUserData.value)
    const [friendReqList, setfriendReqList] = useState([])
    const db = getDatabase();

    useEffect(()=> {
        const friendReqRef = ref(db, 'friendrequest');
        onValue(friendReqRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item) => {
            if(data.uid == item.val().receiverID){
                arr.push({...item.val(), id: item.key})
            }
          })
          setfriendReqList(arr)
        });
      },[])
    
  return (
    <div className='box'>
    <h1 className='header'>Friend Requests</h1>
    <div className='useritembox'>
      {friendReqList.map((item,index)=> (
        <div key={index} className='useritem'>
          <div className="imgbox"></div>
          <div className="userinfo">
            <div>
              <h4>{item.senderName}</h4>
              <p>MERN 2306</p>
            </div>
            <div>
              <button>Confirm</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  </div>
  )
}

export default FriendRequest