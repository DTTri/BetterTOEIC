import React from 'react'
import RegisterForm from '@/components/auth/RegisterForm'
import { Footer, Header } from '@/components'

export default function LoginPage() {
  return (
    <div className='bg-[#F5F6FA]'>
      <Header/>
      <div className="content p-10">
        <RegisterForm/>
      </div>
      <Footer/>
    </div>
  )
}
