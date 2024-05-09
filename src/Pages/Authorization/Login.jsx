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
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <LoginHeading variant="h4" component="h4">
              Login to your account!
            </LoginHeading>
            <Images source={googleimg} className="googleimg"/>
            <div className='inputbox'>
              <InputBox variant="standard" label='Email Address'/>
              <InputBox variant="standard" label= "Password"/>
            </div>
            <div className='logbtn'>
              <BootstrapButton variant="contained" disableRipple>
                Login to Continue
              </BootstrapButton>
            </div>
            <p style={{fontSize: '17px', color: '#03014C', fontWeight: '400' }}>Don’t have an account ?<a href="/Registration" style={{color: '#EA6C00', fontWeight: '700'}}> Sign up</a></p>
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