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
          <Select>
            <SelectTrigger value={language} className="w-[180px]">
              <span className="flex flex-row">
                <img src={language === 'vi' ? VN : VN} alt="" className="h-5 w-8 inline-block" />
                <span className="ml-3 truncate">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </span>
            </SelectTrigger>
            <SelectContent className='bg-background'>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItemWithImage onClick={() => { () => setLanguauge('vi') }} value='vi' imageSrc={VN}>Tiếng Việt</SelectItemWithImage>
                <SelectItemWithImage onClick={() => { () => setLanguauge('en') }} value='en' imageSrc={VN}>English</SelectItemWithImage>
              </SelectGroup>
            </SelectContent>
          </Select>
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
