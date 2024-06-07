import React, { useEffect, useState } from 'react'
import UserList from '../../Components/home/UserList'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';

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

      // Request Delete
      const handleReqDelete = (deleteinfo)=> {
        remove(ref(db, "friendrequest/" + deleteinfo.id )).then(()=>{

        })
      }

      // Confirm Request 
       const handleReqConfirm = (confirminfo) => {
        set(push(ref(db, "friends" )),{
          senderID: confirminfo.senderID,
          senderEmail: confirminfo.senderEmail,
          senderName: confirminfo.senderName,
          receiverID: confirminfo.receiverID,
          receiverEmail: confirminfo.receiverEmail,
          receiverName: confirminfo.receiverName
        }).then(()=>{
          remove(ref(db, "friendrequest/" + confirminfo.id )).then(()=>{

          })
        })
       }
    
  return (
    <div className='box'>
    <h1 className='header'>Friend Requests</h1>
    <div className='useritembox'>
      {friendReqList.length > 0 ?
        friendReqList.map((item,index)=> (
        <div key={index} className='useritem'>
          <div className="imgbox"></div>
          <div className="userinfo">
            <div>
              <h4>{item.senderName}</h4>
              <p>MERN 2306</p>
            </div>
            <div>
              <button onClick={()=>handleReqConfirm(item)}>Confirm</button>
              <button onClick={()=>handleReqDelete(item)}>Delete</button>
            </div>
          </div>
        </div>
      ))
      :
      <Alert severity="info">No Request Found</Alert>
      }
    </div>
  </div>
  )
}

export default FriendRequest