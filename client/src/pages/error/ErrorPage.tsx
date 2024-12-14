import React from 'react'
import imgError from "../../assets/Site_constructor.png"
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material';
import { Footer, Header } from '@/components';

/*
HOW TO USE ERROR PAGE:
- Import ErrorPage component and useEffect for checking errorType from location.state
- Insert this into your page
  const navigate = useNavigate();
  useEffect(() => {
    // Nếu lỗi 404
    if (điều kiện lỗi 404) {
      navigate('/error', { state: { errorType: '404' } });
    }
    // Nếu lỗi 500
    else if (điều kiện lỗi 500) {
      navigate('/error', { state: { errorType: '500' } });
    }
    // Nếu lỗi mạng
    else if (điều kiện lỗi mạng) {
      navigate('/error', { state: { errorType: 'network' } });
    }
  }, [navigate]);
  //dependecy in useEffect is about to check when navigating many times
*/

export default function () {
  const location = useLocation();
  const errorType = location.state?.errorType || 'unknown';

  console.log('errorType', errorType);

  let errorTitle = '';
  let erroMessage = '';
  let errorDescription = '';

  switch (errorType) {
    case '404':
      errorTitle = '404';
      erroMessage = 'Sorry, the page you are looking for does not exist';
      errorDescription = 'Please check the URL or go back to the homepage to continue';
      break;
    case '500':
      errorTitle = '500';
      erroMessage = 'A server error has occurred';
      errorDescription = 'We are working to fix this issue. Please try again later';
      break;
    case 'network':
      errorTitle = 'Network Error';
      erroMessage = 'Unable to connect to the network';
      errorDescription = 'Please check your internet connection and try reloading the page';
      break;
    case 'not-authenticated':
      errorTitle = 'Access Denied';
      erroMessage = 'You do not have the necessary permissions to access this page';
      errorDescription = 'Please contact the administrator if you believe this is a mistake';
      break;
    default:
      errorTitle = 'Unknown Error';
      erroMessage = 'Sorry, an unexpected error has occurred';
      errorDescription = 'Please check the URL or go back to the homepage to continue';
  }
  

  return (
    <div className="">
      <div className='w-full py-8 flex flex-col items-center'>
        <h2 className='text-[#000] text-6xl font-bold mb-4'>
          {errorTitle}
        </h2>
        <p className='text-[#000] text-3xl font-bold'>{erroMessage}</p>
        <p className='text-[#000] text-xl font-normal mb-6'>{errorDescription}</p>
        <div className="image max-w-[570px] max-h-[400px] mb-9">
          <img className='w-full h-full object-cover object-center' src={imgError} alt=""/>
        </div>
        <Button variant='contained' color='primary' href='/'>Back to home</Button>
      </div>
    </div>
  )
}
