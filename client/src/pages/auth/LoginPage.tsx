import React from 'react'
import LoginForm from '@/components/auth/LoginForm'
import { Footer, Header } from '@/components'

export default function LoginPage() {
  return (
    <div className='bg-[#F5F6FA]'>
      <Header/>
      <div className="content p-10">
        <LoginForm/>
      </div>
      <Footer/>
    </div>
  )
}
