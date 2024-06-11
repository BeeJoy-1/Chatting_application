import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const MessageBox = () => {

  const activeChatData = useSelector((state) => state.ActiveChat.value)
  const data = useSelector((state) => state.LoggedInUserData.value)

  const [msgtext, setmsgtext] = useState("")
  // console.log(msgtext);
  const handleSubmit = () => {
    // console.log(msgtext);
  }

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
            <div className='sendmain'>
              <p className="sendermsg">HELLO</p>
            </div>
            <div className='receivemain'>
              <p className="receivermsg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, doloremque quasi. Veniam iure quam dolor fuga alias, accusamus aspernatur molestiae, nobis, unde veritatis placeat sint.</p>
            </div>
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