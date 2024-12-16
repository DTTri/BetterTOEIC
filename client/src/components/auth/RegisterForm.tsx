import React, { useEffect } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import google_icon from '@/assets/google_icon.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authService from '@/services/authService';


export default function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = React.useState('');
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  const handleRegister = async () => {
    if(email === '' || password === '' || name === '' || retypePassword === '') {
      alert('Please fill in all fields');
      return;
    }
    if(!email.match(emailRegex)) {
      alert('Please enter a valid email');
      return;
    }
    if(!password.match(passwordRegex)) {
      alert('Password must contain at least 12 characters, 1 uppercase letter, 1 number and 1 special character');
      return;
    }
    if(password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await authService.register({name, email, password});
      if(response.EC === 0) { 
        const repsonseVerify = await authService.sendVerificationEmail({
          "_id": response.DT,
        });
        if(repsonseVerify.EC === 0) {
          setIsRegisterSuccess(true);
        }
        else {
          console.log("Fail to send verification email " + repsonseVerify.EM);
        }
      }
      else{
        console.log("Fail to register " + response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div style={{ transition: 'all 0.7s ease' }}  
    className={`max-w-[420px] w-full px-9 py-9 bg-[#fff] shadow-lg rounded-[24px] flex flex-col mx-auto duration-700 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
      <h3 className='text-[#000] text-sm font-normal'>LET'S GET YOU STARTED</h3>
      <h2 className='text-[#000] text-2xl font-semibold mb-5'>Create an Account</h2>
      <div className="flex flex-col gap-5">
      <TextField value={name} onChange={(e) => {
            setName(e.target.value);
        }} color='info' style={{width: '100%', fontSize: '16px', fontFamily: "Nunito Sans"}} id="email-outlined" label="Your name" type='text' variant="outlined" size='medium'/>
        { email === ''  || email.match(emailRegex) ?
          <TextField value={email} onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }} color='info' style={{width: '100%', fontSize: '16px', fontFamily: "Nunito Sans"}} id="email-outlined" label="Email" type='email' variant="outlined" size='medium'/>
          : <TextField value={email} onChange={(e) => {
            console.log(e.target.value);  
            setEmail(e.target.value);
          }} error color='info' style={{width: '100%', fontSize: '16px', fontFamily: 'Nunito Sans'}} id="email-outlined" label="Email" type='email' variant="outlined" size='medium' helperText="Example@gmail.com"/>
        }
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Retype Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showRetypePassword ? 'text' : 'password'}
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showRetypePassword ? 'hide the password' : 'display the password'
                  }
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Retype Password"
          />
        </FormControl>
      </div>
      <Link to=''><Button onClick={handleRegister} variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer', marginTop: '20px'}}>REGISTER</Button></Link>
      {isRegisterSuccess && <p className='w-full text-cyan-600 text-sm font-normal mt-3'>Registration successful. Please check your email to verify your account</p>}
      <div className="w-full relative my-6">
        <div className="w-full h-[0.5px] border-t-[1px] border-[#c9bfbf]"></div>
        <span className='block text-sm font-bold text-[#212121] bg-[#fff] py-1 px-2 absolute translate-y-[-60%] left-1/2 translate-x-[-50%]'>or</span>
      </div>
      <a
        target='blank'
        href='#'
        className='group gap-3 hover:bg-slate-100 hover:shadow-md flex items-center justify-center  bg-[#FAFAFA] border-[#eee] px-3 py-2 border shadow-sm rounded-md sm:text-sm'>
        <img className='w-5 h-5 ' src={google_icon} alt="" />
        <span className='inline-block text-xs text-[#828282] font-bold '>Sign up with google</span>
      </a>
      <div className="flex flex-row justify-center mt-5 gap-2">
        <span className='text-[#212121] font-normal text-[16px] '>Already have an account?</span>
        <Link to='/login' className='text-[#212121] font-bold text-[16px] underline hover:text-slate-500'>LOGIN HERE</Link>
      </div>
    </div>
  )
}
