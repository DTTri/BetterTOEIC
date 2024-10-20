import { useState } from 'react';
import Logo from '../assets/Logo_BetterTOEIC.png';
import Noti from '../assets/Noti_icon.svg';
import { Button } from '@mui/material';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithImage,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import VN from '../assets/VN_Flag.png';
import { Link } from 'react-router-dom';

export default function Header() {
  const [language, setLanguauge] = useState('vi');
  const [isChooseLanguauge, showChooseLanguauge] = useState(false);

  return (
    <>
      <header className="bg-[#ffffff] w-full px-9 py-5 ">
        <div className="w-full flex flex-row justify-between  items-center">
          <a href="#">
          <img className='flex justify-center max-w-full object-cover object-center' src={Logo} alt="BetterTOEIC" />
        </a>
        <div className="right flex flex-row gap-[32px] items-center justify-center">
          <ul className='flex flex-row gap-[18px]'>
            <li><Link to='/road-map'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Lộ trình hóa</Button></Link></li>
            <li><Link to='/vocab'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Từ vựng</Button></Link></li>
            <li><Link to='/test-page'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Đề thi</Button></Link></li>
            <li><Link to='/practice'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Luyện tập</Button></Link></li>
            <li><Link to='/forum'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Diễn đàn</Button></Link></li>
          </ul>
          <div className="icon_noti">
            <button className='flex items-center justify-center'><img src={Noti} alt="" /></button>
          </div>
          
          <Select onValueChange={(e: any) => {
            console.log(e);
            if(e === 'en'){
              setLanguauge('en');
            }else{
              setLanguauge('vi');
            }
          }}> 
          <SelectTrigger value={language} className="flex flex-row w-[180px] gap-2 justify-between shadow-none bg-background py-2 px-2 border-none">
                <img src={language === 'vi' ? VN : VN} alt="" className="h-5 w-8 block object-cover object-fill" />
                <span className='font-semibold text-base'>{language == 'vi' ? 'Tiếng Việt' :'English'}</span>
            </SelectTrigger>
            <SelectContent className='bg-background'>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItemWithImage value='vi' imageSrc={VN}>Tiếng Việt</SelectItemWithImage>
                <SelectItemWithImage value='en' imageSrc={VN}>English</SelectItemWithImage>
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
