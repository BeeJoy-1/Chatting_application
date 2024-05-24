import React, { useEffect, useState } from 'react'
import './homepage.css'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'


const UserList = () => {

  const db = getDatabase();
  const [UserList, setUserList] = useState([])
  const data = useSelector((state) => state.LoggedInUserData.value)
  console.log(data.uid);
  
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

  console.log(UserList);


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
                <button>Add</button>
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