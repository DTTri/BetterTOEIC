import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import google_icon from '@/assets/google_icon.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className='max-w-[420px] w-full px-9 py-9 bg-[#fff] rounded-[24px] flex flex-col mx-auto'>
      <h3 className='text-[#000] text-sm font-normal'>WELCOME BACK</h3>
      <h2 className='text-[#000] text-2xl font-semibold mb-5'>Log In to your Account</h2>
      <div className="flex flex-col gap-5">
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
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-4 mb-4">
        <FormControlLabel control={<Checkbox  value={rememberMe} onChange={(e) => {console.log(e.target.checked)}} />} label="Remember me" style={{fontFamily: "Nunito Sans"}}/>
        <Link to='/forgot-password' className='text-[#000] text-sm font-normal hover:text-slate-500'>Forgot Password?</Link>
      </div>
      <Link to=''><Button variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer'}}>LOG IN</Button></Link>
      <div className="w-full relative my-6">
        <div className="w-full h-[0.5px] border-t-[1px] border-[#c9bfbf]"></div>
        <span className='block text-sm font-bold text-[#212121] bg-[#fff] py-1 px-2 absolute translate-y-[-60%] left-1/2 translate-x-[-50%]'>or</span>
      </div>
      <a
        target='blank'
        href='#'
        className='group gap-3 hover:bg-slate-100 hover:shadow-md flex items-center justify-center  bg-[#FAFAFA] border-[#eee] px-3 py-2 border shadow-sm rounded-md sm:text-sm'>
        <img className='w-5 h-5 ' src={google_icon} alt="" />
        <span className='inline-block text-xs text-[#828282] font-bold '>Continue with google</span>
      </a>
      <div className="flex flex-row justify-center mt-5 gap-2">
        <span className='text-[#212121] font-normal text-[16px] '>New User?</span>
        <Link to='/register' className='text-[#212121] font-bold text-[16px] underline hover:text-slate-500'>SIGN UP HERE</Link>
      </div>
    </div>
  )
}
