import LoginForm from '@/components/auth/LoginForm'
import { sUser } from '@/store'
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const user = sUser.use(cur => cur.info);

  if(user && user._id) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className='bg-[#F5F6FA]'>
      <div className="content p-10">
        <LoginForm/>
      </div>
    </div>
  )
}
