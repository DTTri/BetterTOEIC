import { Footer, Header } from '@/components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { ReactNode } from 'react';
import { userService } from '@/services';
import { sUser } from '@/store';

export default function UserLayout({ children, haveHeader = true, haveFooter = true }: { children: ReactNode, haveHeader?: boolean, haveFooter?: boolean}) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if(!token) {
    return <Navigate to='/login' />
  }
  return (
    <div className='w-full overflow-y-auto bg-gray-100'>
        { haveHeader && <Header /> }
        <div className='w-full min-h-screen h-full'>
          {children}
        </div>
        { haveFooter && <Footer /> }
    </div>
  )
}
