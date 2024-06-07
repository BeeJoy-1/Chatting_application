import React, { useEffect, useState } from 'react'
import './homepage.css'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';



const UserList = () => {

  const db = getDatabase();
  const [UserList, setUserList] = useState([])
  const [FriendReqlist, setFriendReqlist] = useState([])
  const [Friends, setFriends] = useState([])
  const data = useSelector((state) => state.LoggedInUserData.value)

  
  // All user list 
  useEffect(()=> {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(item.key != data.uid){
          arr.push({...item.val(), id: item.key})
        }
      })
      setUserList(arr)
    });
  },[])

  // Friend request list 
  useEffect(()=> {
    const usersRef = ref(db, 'friendrequest');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(data.uid == item.val().senderID || data.uid == item.val().receiverID){
          arr.push(item.val().senderID + item.val().receiverID)
        }
      })
      setFriendReqlist(arr)
    });
  },[])

  // Friend List
  useEffect(()=> {
    const usersRef = ref(db, 'friends');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(item.val().senderID == data.uid || item.val().receiverID == data.uid){
          arr.push(item.val().senderID + item.val().receiverID )
        }
      })
      setFriends(arr)
    });
  },[])
  

    let handleFriendRequest = (freqinfo) => {
      console.log(freqinfo);
      set(push(ref(db, "friendrequest" )),{
        senderID: data.uid,
        senderEmail: data.email,
        senderName: data.displayName,
        receiverID: freqinfo.id,
        receiverEmail: freqinfo.email,
        receiverName: freqinfo.displayName
      }).then(()=>{
        console.log("ok");
      })
    }

  return (
    <div className='box'>
      <h1 className='header'>Users</h1>
      <div className='useritembox'>
        {UserList.length > 0 ?
          UserList.map((item,index)=> (
          <div key={index} className='useritem'>
            <div className="imgbox"></div>
            <div className="userinfo">
              <div>
                <Link to={`/Profile/${item.id}`}>
                  <h4 style={{paddingBottom: "5px"}}>{item.displayName}</h4>
                </Link>
                <p>MERN 2306</p>
              </div>
              {FriendReqlist.includes(data.uid + item.id) || FriendReqlist.includes(item.id + data.uid)
                ?
                <button>Cancel</button>
                :
                  Friends.includes(data.uid + item.id) || Friends.includes(item.id + data.uid)
                  ?
                  <button disabled >Friend</button>
                  :
                  <button onClick={() => handleFriendRequest(item)}>Add</button>
              }
            </div>
          </div>
        )) 
        :
        <Alert severity="info">No Suggest User Found</Alert>
        }
      </div>
    </div>
  )
}

export default UserList