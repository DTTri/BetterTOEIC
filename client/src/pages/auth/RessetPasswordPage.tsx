import { Footer, Header } from '@/components'
import RessetPasswordForm from '@/components/auth/ResetPasswordForm'
import React from 'react'

export default function RessetPasswordPage() {
  return (
    <div className='bg-[#F5F6FA]'>
      <Header/>
      <div className="content p-10">
        <RessetPasswordForm/>
      </div>
      <Footer/>
    </div>
  )
}
