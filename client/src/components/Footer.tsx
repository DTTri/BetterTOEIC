import Logo from '../assets/Logo_BetterTOEIC.png'
import Facebook from '../assets/Facebook.svg'
import Instagram from '../assets/Instagram.svg'
import Youtube from '../assets/YouTube.svg'

export default function Footer() {
  return (
    <>
      <footer className=' bg-[#ffffff] w-full pt-[40px] px-[130px] pb-4'>
        <div className='footer-top flex flex-row justify-between border-b pb-[50px]'>
          <div>
            <a href="#">
              <img
                className='block max-w-full object-cover object-center mb-[32px]'
                src={Logo}
                alt="BetterTOEIC"
              />
            </a>
            <p className='font-semibold text-xl max-w-[350px] text-wrap mb-[24px]'>
            The No. 1 TOEIC Test Preparation Support System at the University of Information Technology
            </p>
            <div className='flex flex-row gap-5 items-center'>
              <a href="#">
                <img src={Facebook} alt="facebook" />
              </a>
              <a href="#">
                <img src={Instagram} alt="linkedin" />
              </a>
              <a href="#">
                <img src={Youtube} alt="youtube" />
              </a>
            </div>
          </div>
          <div className="footer-columns flex flex-row gap-[70px]">
            <div className='flex flex-col gap-6'>
              <h4 className='font-bold text-[22px] leading-tight'>About us</h4>
              <ul className='flex flex-col gap-2'>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="#">Information</a>
                </li>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-6'>
              <h4 className='font-bold text-[22px] leading-tight'>Terms</h4>
              <ul className='flex flex-col gap-2'>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="#">Codition</a>
                </li>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="#">Privacy</a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-6'>
              <h4 className='font-bold text-[22px] leading-tight'>Contact</h4>
              <ul className='flex flex-col gap-2'>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="mailto:bettertoeic@gmail.com">bettertoeic@gmail.com</a>
                </li>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="tel:0123456789">0123456789</a>
                </li>
                <li>
                  <a className='text-[#6F6C90] text-[17px] hover:text-[#3A7EE1]' href="#">UIT - ĐHQGHCM</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-bottom flex flex-row justify-between mt-6'>
          <p className='text-[18px] text-[#6F6C90] font-normal'>
            Copyright© 2024 BetterTOEIC
          </p>
          <p className='text-[18px] text-[#6F6C90] font-normal'>
            All Rights Reserved | Terms and Conditions | Privacy Policy
          </p>
        </div>
      </footer>
    </>
  );
}
