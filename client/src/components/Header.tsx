import { useState } from 'react';
import Logo from '../assets/Logo_BetterTOEIC.png';
import Noti from '../assets/Noti_icon.svg';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithImage,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import VN from '../assets/VN_Flag.png';

export default function Header() {
  const [language, setLanguauge] = useState('vi');
  const [isChooseLanguauge, showChooseLanguauge] = useState(false);

  return (
    <>
      <header className="absolute top-0 bg-background w-full px-9 py-5 ">
        <div className="w-full flex flex-row justify-between  items-center">
          <a href="#">
          <img className='flex justify-center max-w-full object-cover object-center' src={Logo} alt="BetterTOEIC" />
        </a>
        <div className="right flex flex-row gap-[32px] items-center justify-center">
          <ul className='flex flex-row gap-[18px]'>
            <li><a href="">Lộ trình hóa</a></li>
            <li><a href="">Từ vựng</a></li>
            <li><a href="">Đề thi</a></li>
            <li><a href="">Luyện tập</a></li>
            <li><a href="">Diễn đàn</a></li>
          </ul>
          <div className="icon_noti">
            <img src={Noti} alt="" />
          </div>
          <form className='relative w-[180px] language_select hover' onSubmit={(event) => { event.preventDefault(); showChooseLanguauge((prevState) => !prevState); }}>
            <button className="relative w-full cursor-default rounded-md bg-white py-[7px] pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 mb-1">
              <span className="flex items-center">
                <img src={language === 'vi' ? VN : VN} alt="" className="h-5 w-8 flex-shrink-0" />
                <span className="ml-3 block truncate">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div className={`absolute top-[40px] w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${isChooseLanguauge ? '' : 'hidden'} `} aria-haspopup="listbox">
              <span className='w-full flex flex-row items-center gap-3 py-[7px] border-b-2' onClick={() => { setLanguauge('vi'); showChooseLanguauge(false); }}>
                <img src={VN} className='h-5 w-8' alt="" />
                <span>Tiếng Việt</span>
              </span>
              <span className='flex flex-row items-center gap-3 py-[7px]' onClick={() => { setLanguauge('en'); showChooseLanguauge(false); }}>
                <img src={VN} className='h-5 w-8 inline-block' alt="" />
                <span>English</span>
              </span>
            </div>
          </form>
          <Select>
          <SelectTrigger value={language} className="flex flex-row w-auto gap-4 justify-between shadow-none bg-background h-auto py-0 px-0 border-none">
                <img src={language === 'vi' ? VN : VN} alt="" className="max-h-10 max-w-10 aspect-square w-full h-full inline-block rounded-full object-cover object-fill" />
                <div className="flex flex-col">
                  <span className='text-[16px] font-semibold '>Thinh</span>
                  <span className='text-[12px] font-normal '>User</span>
                </div>
            </SelectTrigger>
            <SelectContent className='bg-background'>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItemWithImage value='vi' imageSrc={VN}>Tiếng Việt</SelectItemWithImage>
                <SelectItemWithImage value='en' imageSrc={VN}>English</SelectItemWithImage>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        </div>
      </header>
    </>
  );
}
