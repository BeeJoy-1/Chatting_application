import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';

const Friends = () => {
    
    const db = getDatabase();
    const data = useSelector((state) => state.LoggedInUserData.value)
    const [friendsList, setfriendsList] = useState([])

    useEffect(()=> {
        const usersRef = ref(db, 'friends');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item) => {
            if(item.val().senderID == data.uid || item.val().receiverID == data.uid){
                arr.push({...item.val(), id: item.key})
            }
          })
          setfriendsList(arr)
        });
      },[])
      console.log(friendsList);

  return (
    <div className='box'>
    <h1 className='header'>Friends</h1>
    <div className='useritembox'>
        {friendsList.length > 0 ?
            friendsList.map((item,index) => (
                <div key={index} className='useritem'>
                <div className="imgbox"></div>
                <div className="userinfo">
                    <div>
                    <h4>{item.receiverID == data.uid 
                        ?
                        item.senderName 
                        :
                        item.receiverName
                        }
                    </h4>
                    <p>MERN 2306</p>
                    </div>
                    <div>
                    <button >Unfollow</button>
                    <button >Block</button>
                    </div>
                </div>
                </div>
            ))
            :
            <Alert severity="info">No Friends Found</Alert>
        }
    </div>
  </div>
  )
}

export default Friends