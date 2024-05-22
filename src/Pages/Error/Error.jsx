import React from 'react'
import Images from '../../Components/Utilities/Images'
import errorimg from '../../assets/images/error.jfif'
import { Link } from 'react-router-dom'

const Error = () => {


  return (
      <>
        <div className='errormain'>
          <Images source={errorimg} style={{width: "100%", height: "100vh", objectFit: "cover", zIndex: "100"}}/>
          <Link to="/" className='errorbtn'>Back to home..</Link>
        </div>
      </>
  )
}

export default Error