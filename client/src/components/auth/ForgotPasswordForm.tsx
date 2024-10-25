import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import google_icon from '@/assets/google_icon.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function ForgotPasswordForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className='max-w-[420px] w-full px-9 py-9 bg-[#fff] rounded-[24px] flex flex-col mx-auto'>
      <h2 className='text-[#000] text-2xl font-semibold mb-1'>Forgot password</h2>
      <h3 className='text-[#000] text-sm font-normal mb-5'>Don’t worry, we will send you a verification in your email to reset your password</h3>
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
      </div>
      <Link to=''><Button variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer', marginTop: '20px'}}>SEND</Button></Link>
      <div className="flex flex-row justify-center mt-5 gap-2">
        <span className='text-[#212121] font-normal text-[16px] '>New User?</span>
        <Link to='/register' className='text-[#212121] font-bold text-[16px] underline hover:text-slate-500'>SIGN UP HERE</Link>
      </div>
    </div>
  )
}
