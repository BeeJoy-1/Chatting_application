import React, { useEffect, useState } from 'react'
import './homepage.css'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'


const UserList = () => {

  const db = getDatabase();
  const [UserList, setUserList] = useState([])
  const data = useSelector((state) => state.LoggedInUserData.value)

  
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
        {UserList.map((item,index)=> (
          <div key={index} className='useritem'>
            <div className="imgbox"></div>
            <div className="userinfo">
              <div>
                <h4>{item.displayName}</h4>
                <p>MERN 2306</p>
              </div>
              <div>
                <button onClick={() => handleFriendRequest(item)}>Add</button>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default UserList