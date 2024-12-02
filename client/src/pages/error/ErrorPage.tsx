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
      erroMessage = 'Xin lỗi, trang bạn đang tìm không tồn tại';
      errorDescription = 'Hãy kiểm tra lại URL hoặc quay về trang chủ để tiếp tục';
      break;
    case '500':
      errorTitle = '500';
      erroMessage = 'Đã xảy ra lỗi từ phía máy chủ';
      errorDescription = 'Chúng tôi đang khắc phục sự cố này. Vui lòng thử lại sau';
      break;
    case 'network':
      erroMessage = 'Không thể kết nối mạng';
      errorDescription = 'Hãy kiểm tra lại kết nối internet của bạn và thử tải lại trang.';
      break;
    default:
      erroMessage = 'Xin lỗi, đang có sự cố xảy ra';
      errorDescription = 'Hãy kiểm tra lại URL hoặc quay về trang chủ để tiếp tục';
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
        <Button variant='contained' color='primary' href='/login'>Quay về trang chủ</Button>
      </div>
    </div>
  )
}
