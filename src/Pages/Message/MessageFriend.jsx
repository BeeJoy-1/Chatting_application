import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ActiveChatUser } from '../../slices/ActiveMsgSlice';

const MessageFriend = () => {

    const db = getDatabase();
    const data = useSelector((state) => state.LoggedInUserData.value)
    const activeChatData = useSelector((state) => state.ActiveChat.value)
    const [friendsList, setfriendsList] = useState([])
    const dispatch = useDispatch()
    // console.log(activeChatData);

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

      const handleChat = (chatinfo) => {
        dispatch(ActiveChatUser(chatinfo))
      }


  return (
    <div className='box msg'>
        <h1 className='header'>Friends</h1>
        <div className='useritembox msg'>
         {friendsList.length > 0 ?
            friendsList.map((item,index) => (
                <div onClick={(e)=> handleChat(item)} key={index} className='useritem msg'>
                    <div className="imgbox"></div> 
                    <div className="userinfo">
                        <div>
                            <h4 style={{paddingBottom: "5px"}}>{item.receiverID == data.uid 
                                ?
                                item.senderName 
                                :
                                item.receiverName
                                }
                            </h4>
                            <p>MERN 2306</p>
                        </div>
                        {/* <div>
                            <button >Unfollow</button>
                            <button >Block</button>
                        </div> */}
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

export default MessageFriend