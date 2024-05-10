import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({variant,label,id,type,name,onChange,value}) => {
  return (
    <TextField fullWidth id={id} type={type} name={name} onChange={onChange} value={value} label={label} variant={variant} />
  )
}

export default InputBox