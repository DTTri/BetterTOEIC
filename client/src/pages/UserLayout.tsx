import { Footer, Header } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { ReactNode } from 'react';

export default function UserLayout({ children, haveHeader = true, haveFooter = true }: { children: ReactNode, haveHeader?: boolean, haveFooter?: boolean }) {
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
