import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';


export default function AuthLayout() {
  return (
    <div className='w-full overflow-y-auto bg-gray-100'>
        <Header />
        <div className='w-full min-h-screen h-full'>
          <Outlet />
        </div>
        <Footer /> 
    </div>
  )
}
