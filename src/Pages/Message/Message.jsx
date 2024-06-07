import React from 'react'
import MessageFriend from './MessageFriend'
import MessageBox from './MessageBox'

const Message = () => {
  return (
    <div style={{display: "flex", gap: "35px", marginTop: "34px"}}>
      <MessageFriend/>
      <MessageBox/>
    </div>
  )
}

export default Message