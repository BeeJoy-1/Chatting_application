import React from 'react'

const Images = ({source,alt,className,onClick,style}) => {
  return (
    <>
        <img src={source} alt={alt} className={className} onClick={onClick} style={style}/>
    </>
  )
}

export default Images