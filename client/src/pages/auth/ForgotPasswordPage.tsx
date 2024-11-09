import { Footer, Header } from '@/components'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <div className='bg-[#F5F6FA]'>
      <div className="content p-10">
        <ForgotPasswordForm/>
      </div>
    </div>
  )
}
