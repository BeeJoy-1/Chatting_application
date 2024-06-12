import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const MessageBox = () => {

  const activeChatData = useSelector((state) => state.ActiveChat.value)
  const data = useSelector((state) => state.LoggedInUserData.value)
  const db = getDatabase();

  const [msgtext, setmsgtext] = useState("")
  const [Allmsg, setAllmsg] = useState([])

  // console.log(msgtext);

  // Message Write 
  const handleSubmit = () => {
    set(push(ref(db, "Message" )),{
      senderID: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      receiverID: activeChatData.senderID == data.uid ? activeChatData.receiverID : activeChatData.senderID,
      receiverName: activeChatData.senderID == data.uid ? activeChatData.receiverName : activeChatData.senderName,
      receiverEmail: activeChatData.senderID == data.uid ? activeChatData.receiverEmail : activeChatData.senderEmail,
      message: msgtext,
    }).then(() => {
      // console.log("msg sent");
    })
    // console.log(msgtext);
  }

  // Message Read
  useEffect(()=> {
    const usersRef = ref(db, 'Message');
    onValue(usersRef, (snapshot) => {
      let arr = []
      let activeid = data.uid == activeChatData?.senderID ? activeChatData?.receiverID : activeChatData?.senderID
      snapshot.forEach((item) => {
        if((item.val().senderID == data.uid && item.val().receiverID == activeid) || (item.val().senderID == activeid  && item.val().receiverID == data.uid)){
            arr.push({...item.val(), id: item.key})
        }
      })
      setAllmsg(arr)
    });
  },[activeChatData])

  // console.log(Allmsg);

  return (
    <>{activeChatData ?
      <div className='msgmain'>
          <div className="msgheading">
              <div className="imgbox"></div>
              <div>
                  <h3>{
                  activeChatData.receiverName == data.uid ?
                    activeChatData.senderName 
                    :
                    activeChatData.receiverName
                  }</h3>
                  <p>Active Now</p>
              </div>
          </div>
          <div className="msgbody">
            {Allmsg.map((item,index) => (
              item.senderID == data.uid ?
              <div key={index} className='sendmain'>
                <p className="sendermsg">{item.message}</p>
              </div>
              :
              <div key={index} className='receivemain'>
                <p className="receivermsg">{item.message}</p>
              </div>
            ))

            }
          </div>
          <div className="msgfooter">
            <div className='footertings'>
              <input onChange={(e) => setmsgtext(e.target.value)} type="text" className='msginput' placeholder='Enter your message' />
              {msgtext.length > 0 &&
                <button onClick={handleSubmit} className='footerbtn'>send</button>
              }
            </div>
          </div>
      </div>
      :
      <div className='select'>
        <h1 >Please Select a User</h1>
      </div>
    }
    </>
  )
}

export default MessageBox