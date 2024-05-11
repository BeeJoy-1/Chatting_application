import React from 'react'
import * as Yup from 'yup';

const emailregex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Regval =  Yup.object({
    FullName: Yup.string()
    .required('Please enter your name')
    .max(15, 'Must be 15 characters or less')
    .min(6, 'Must be 6 characters or more'),
    email: Yup.string()
    .email('Invalid email address')
    .matches(emailregex,'Regex error')
    .required('Please enter your email'),
    password: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(6, 'Must be 6 characters or more')
    .required('Please enter your password'),
  })

export default Regval