import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({variant,label}) => {
  return (
    <TextField fullWidth id="standard-basic" label={label} variant={variant} />
  )
}

export default InputBox