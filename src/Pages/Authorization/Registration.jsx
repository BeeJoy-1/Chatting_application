import React from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Hidden, Typography } from '@mui/material';
import Images from '../../Components/Utilities/Images'
import './Auth.css'
import InputBox from '../../Components/Utilities/InputBox';
import Button from '@mui/material/Button';
import board from '../../assets/images/board.jpg'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Regval from '../../Components/LoginValidation/Regval';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LoginHeading = styled(Typography)({
  color: '#03014C',
  fontSize: '33px',
  fontWeight: '700',
  paddingBottom: '13px'
})

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '26px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5F34F5',
  borderColor: '#5F34F5',
  width: '100%',
  fontFamily: 'open sans',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#5F34F5',
    borderColor: '#5F34F5',
    boxShadow: 'none',
  }
});

const Registration = () => {

  const auth = getAuth();

  const initialValues = {
    FullName: '',
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Regval,
    onSubmit: (values,actions) => {
      console.log(values);
      actions.resetForm();

      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential);
        sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });
        // const user = userCredential.user;

      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;

      });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <LoginHeading variant="h4" component="h4">
              Get started with easily register
            </LoginHeading>
            <p className='regPera'>Free register and you can enjoy it</p> 
            <form onSubmit={formik.handleSubmit}>
              <div className='inputbox'>
                <div>
                  <InputBox                     
                      id="FullName"
                      name="FullName"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.FullName}
                      variant="standard" 
                      label='FullName'
                    />
                    {formik.touched.FullName && formik.errors.FullName ? (
                      <div style={{color: "red",}}>{formik.errors.FullName}</div>
                    ) : null}
                </div>
                <div>
                  <InputBox 
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    variant="standard" 
                    label='Email Address'
                  />
                   {formik.touched.email && formik.errors.email ? (
                    <div style={{color: "red",}}>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <InputBox 
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    variant="standard" 
                    label= "Password"
                  />
                   {formik.touched.password && formik.errors.password ? (
                    <div style={{color: "red",}}>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className='logbtn'>
                <BootstrapButton type='submit' variant="contained" disableRipple>
                  Login to Continue
                </BootstrapButton>
              </div>
            </form>
            <p style={{fontSize: '17px', color: '#03014C', fontWeight: '400' }}>Already  have an account ?<Link to="/" style={{color: '#EA6C00', fontWeight: '700'}}> Sign In</Link></p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div  style={{width: "100%", height: "100vh", overflowY: "Hidden"}}>
            <Images  className="bannerimg" source={board} alt="Banner" />
          </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Registration