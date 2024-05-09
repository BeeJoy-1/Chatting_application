import React from 'react'

const Images = ({source,alt,className,onClick}) => {
  return (
    <>
        <img src={source} alt={alt} className={className} onClick={onClick}/>
    </>
  )
}

export default Images