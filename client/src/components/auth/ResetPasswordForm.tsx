import authService from '@/services/authService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function RessetPasswordForm() {
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = React.useState('');
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const { token } = useParams();
  const nav = useNavigate();

  const handleResetPassword = async () => {
    if(password === '' || retypePassword === '') {
      alert('Please fill in all fields');
      return;
    }
    if(password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await authService.resetPassword({
        "newPassword": password,
        "confirmNewPassword": retypePassword,
        "token": token
      });
      if(response.EC === 0) {
        nav('/login');
      }
      else{
        console.log("Fail to reset password " + response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='max-w-[420px] w-full px-9 py-9 bg-[#fff] rounded-[24px] flex flex-col mx-auto'>
      <h2 className='text-[#000] text-2xl font-semibold mb-1'>Reset password</h2>
      <h3 className='text-[#000] text-sm font-normal mb-5'>Congratulation! You can log in and study again</h3>
      <div className="flex flex-col gap-5">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
            label="New Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Retype New Password</InputLabel>
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
            label="Retype New Password"
          />
        </FormControl>
      </div>
      <Button onClick={handleResetPassword} 
      variant='outlined' style={{backgroundColor: '#3A7EE1', color: '#fff', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', padding: '8px 0', width: '100%', cursor: 'pointer', marginTop: '20px'}}>RESET</Button>
    </div>
  )
}
