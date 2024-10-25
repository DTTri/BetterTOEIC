import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import google_icon from '@/assets/google_icon.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = React.useState('');
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className='max-w-[420px] w-full px-9 py-9 bg-[#fff] rounded-[24px] flex flex-col mx-auto'>
      <h3 className='text-[#000] text-sm font-normal'>LET'S GET YOU STARTED</h3>
      <h2 className='text-[#000] text-2xl font-semibold mb-5'>Create an Account</h2>
      <div className="flex flex-col gap-5">
      <TextField value={email} onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
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
                  onClick={() => setShowRetypePassword(!showPassword)}
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
      <Link to=''><Button variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer', marginTop: '20px'}}>Log In</Button></Link>
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
