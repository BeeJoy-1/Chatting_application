import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Hidden, Typography } from '@mui/material';
import Images from '../../Components/Utilities/Images'
import googleimg from '../../assets/images/Google.png'
import Banner from '../../assets/images/wine.jpg'
import './Auth.css'
import InputBox from '../../Components/Utilities/InputBox';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logval from '../../Components/LoginValidation/logval';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../../slices/authSlice';

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
  paddingBottom: '30px'
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


const Login = () => {

  const [loader, setLoader] = useState(false)

  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
   
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   
    const user = result.user;
   
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    const email = error.customData.email;
  
    const credential = GoogleAuthProvider.credentialFromError(error);
  
  });
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: logval,
    onSubmit: (values,actions) => {
      // console.log(values);
      setLoader(true)
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        actions.resetForm();
        if(user.emailVerified){
          localStorage.setItem("LoggedInUser", JSON.stringify(user))
          dispatch(incrementByAmount(user))
          navigate("/home");
          setLoader(false)
        }else{
          toast("Please verify your email!...")
          setLoader(false)
          signOut(auth).then(() => {

          }).catch((error) => {
            // An error happened.
          });
        }
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        toast("Invalid Credentials......")
        setLoader(false)
      });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
      <Grid container spacing={2}>
        <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <LoginHeading variant="h4" component="h4">
              Login to your account!
            </LoginHeading>
            <Images onClick={handleGoogleLogin} source={googleimg} className="googleimg"/>
            <form onSubmit={formik.handleSubmit}>
              <div className='inputbox'>
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
                <BootstrapButton disabled={loader} type='submit' variant="contained" disableRipple>
                  {loader ?
                    <BeatLoader color="#fff" size="26px" />
                    :
                    "Login to Continue" 
                  }
                </BootstrapButton>
              </div>
            </form>
            <p style={{fontSize: '17px', color: '#03014C', fontWeight: '400' }}>Don’t have an account ?<Link to="/Registration" style={{color: '#EA6C00', fontWeight: '700'}}> Sign up</Link></p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div  style={{width: "100%", height: "100vh", overflowY: "Hidden"}}>
            <Images  className="bannerimg" source={Banner} alt="Banner" />
          </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Login