import { Footer, Header } from '@/components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { ReactNode } from 'react';

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
