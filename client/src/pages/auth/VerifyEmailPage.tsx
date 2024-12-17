import successImg from '@/assets/SuccessConstructor.png';
import LoadingProgress from '@/components/LoadingProgress';
import authService from '@/services/authService';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgError from "../../assets/Site_constructor.png";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);
  const handleVerifyEmail = async () => {
    try {
      const response = await authService.verifyEmail({token});
      if(response.EC === 0) {
        setIsVerifySuccess(true);
        console.log(response.DT);
      }
      else {
        console.log("Fail to verify email " + response.EM);
      }
    } catch (error) {
      console.log(error);
    }  
  }
  
  useEffect(() => {
    handleVerifyEmail();
  }, [token]);
  if(!token) {
    return (<LoadingProgress />)
  }
  return (
    <div>
        { isVerifySuccess ? (
            <div className='w-full py-8 flex flex-col items-center'>
            <p className='text-[#000] text-3xl font-bold'>REGISTER SUCCESSFULLY</p>
            <p className='text-[#000] text-xl font-normal mb-6'>Please back to login</p>
            <div className="image max-w-[400px] max-h-[300px] mb-12">
              <img className='w-full h-full object-cover object-center' src={successImg} alt=""/>
            </div>
            <Button variant='contained' color='primary' href='/login'>Login</Button>
          </div>
        ) : (
            <div className='w-full py-8 flex flex-col items-center'>
            <p className='text-[#000] text-3xl font-bold'>REGISTER FAIL</p>
            <p className='text-[#000] text-xl font-normal mb-6'>Because your verification link is out of time or your email has already been verified, please reset your password</p>
            <div className="image max-w-[570px] max-h-[400px] mb-9">
              <img className='w-full h-full object-cover object-center' src={imgError} alt=""/>
            </div>
            <Button variant='contained' color='primary' href='/forgot-password'>Forgot password</Button>
          </div>
        )}
    </div>
  )
}
