import React, { useEffect } from 'react'
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import authService from '@/services/authService';
import { toast } from "react-toastify";


export default function ForgotPasswordForm() {
  const [email, setEmail] = React.useState('');
  const [show, setShow] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nav = useNavigate();
  
  const handleBack = () => {
    nav('/login');
  }

  const handleForgotPassword = async () => {
    if(email === '') {
      toast.error('Please fill in all fields');
      return;
    }
    if(!email.match(emailRegex)) {
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const response = await authService.forgotPassword({email});
      if(response.EC === 0) {
        toast.success('Verification link has been sent to your email');
      }
    } catch (error) {
      toast.error("Fail to forgotpassword");
      console.log("Fail to forgotpassword " + error);
    }    
  }

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div style={{ transition: 'all 0.7s ease' }} 
    className={`max-w-[420px] w-full px-9 py-9 pt-7 bg-[#fff] shadow-lg rounded-[24px] flex flex-col mx-auto duration-700 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
      <ArrowBackIcon onClick={handleBack} sx={ { width: 30, height: 30 }} className='text-[#000] text-2xl font-semibold ml-[-16px] mb-3 cursor-pointer hover:bg-slate-100 rounded-full'/>
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
      <Button onClick={handleForgotPassword} variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer', marginTop: '20px'}}>SEND</Button>
      <div className="flex flex-row justify-center mt-5 gap-2">
        <span className='text-[#212121] font-normal text-[16px] '>New User?</span>
        <Link to='/register' className='text-[#212121] font-bold text-[16px] underline hover:text-slate-500'>SIGN UP HERE</Link>
      </div>
    </div>
  )
}
