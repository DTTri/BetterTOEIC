// This is just a stub code (mock code)
import Logo from '../assets/Logo_BetterTOEIC.png'
import Facebook from '../assets/Facebook.svg'
import Instagram from '../assets/Instagram.svg'
import Youtube from '../assets/YouTube.svg'

export default function Footer() {
  return <>
    <footer className='bg-background w-full max-h-[550px] px-[130px]'>
        <div className='footer-top flex flex-row justify-between border-b pt-[80px] pb-[90px]'>
            <div className=''><a href="#"><img className='block mw-full object-cover object-center mb-[32px]' src={Logo} alt="BetterTOEIC"/></a>
              <p className='font-semibold text-xl max-w-[350px] text-wrap mb-[24px]'>Hệ thống hỗ trợ luyện thi TOEIC số 1 Đại học Công nghệ Thông tin</p>
              <div className='flex flex-row gap-5 items-center '>
                <a href="#"><img src={Facebook} alt="facebook"/></a>
                <a href="#"><img src={Instagram} alt="linkedin"/></a>
                <a  href="#"><img src={Youtube} alt="youtube"/></a>
              </div>
            </div>
            <div className="footer-columns flex flex-row  gap-[70px]">
              <div className='flex flex-col gap-6'>
                <h4 className='font-bold text-[22px] leading-tight '>Về chúng tôi</h4>
                <ul className='flex flex-col gap-2'> 
                  <li > <a className='text-[#6F6C90] text-[18px]' href="#">Giới thiệu</a></li>
                  <li > <a className='text-[#6F6C90] text-[18px]' href="#">FAQ</a></li>
                </ul>
              </div>
              <div className='flex flex-col gap-6'>
                <h4 className='font-bold text-[22px] leading-tight '>Chính sách</h4>
                <ul className='flex flex-col gap-2'> 
                  <li> <a className='text-[#6F6C90] text-[18px]' href="#">Điều khoản</a></li>
                  <li> <a className='text-[#6F6C90] text-[18px]' href="#">Quyền riêng tư</a></li>
                </ul>
              </div>
              <div className='flex flex-col gap-6'>
                <h4 className='font-bold text-[22px] leading-tight '>Liên hệ</h4>
                <ul className='flex flex-col gap-2'> 
                  <li> <a className='text-[#6F6C90] text-[18px]' href="#">bettertoeic@gmail.com</a></li>
                  <li> <a className='text-[#6F6C90] text-[18px]' href="#">0123456789</a></li>
                  <li> <a className='text-[#6F6C90] text-[18px]' href="#">UIT - ĐHQGHCM</a></li>
                </ul>
              </div>
          </div>
        </div>
        <div className='footer-bottom flex flex-row justify-between mt-6'>
          <p className='text-[18px] text-[#6F6C90] font-normal '>Copyright© 2024 BetterTOEIC</p>
          <p className='text-[18px] text-[#6F6C90] font-normal '>All Rights Reserved | Terms and Conditions | Privacy Policy</p>

        </div>
    </footer>
  </>;
}
