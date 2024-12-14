import { useEffect, useState } from 'react';
import Logo from '../assets/Logo_BetterTOEIC.png';
import Noti from '../assets/Noti_icon.svg';
import { Button } from '@mui/material';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithText,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sUser } from '@/store';
import { User } from '@/entities';
import LoadingProgress from './LoadingProgress';
export default function Header() {
  const [selectedItem, setSelectedItem] = useState('');
  const nav = useNavigate();
  const location = useLocation();

  const userInfo = sUser.use(cur => cur.info);
  // const [userInfo, setUserInfo] = useState<User>(user);
  
  // useEffect(() => {
  //   if(user._id !== '') {
  //     setUserInfo(user);
  //   }
  // }, [user._id]);

  if(!userInfo) {
    return <LoadingProgress />;
  }

  console.log("userInfo:", userInfo); // Add this line to log userInfo
  
  useEffect(() => {
    const headerPaths = ['/log-out', '/user-info', '/user-report', '/test-saved', '/word-saved'];
    if (!headerPaths.includes(location.pathname)) {
      setSelectedItem('');
    }
  }, [location.pathname]);

  const handleItemChange = (e: string) => {
    setSelectedItem(e);
    if(e === 'log-out') {
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      sessionStorage.removeItem('token');
      sUser.reset();
      nav('/login');
    }
    else if(e === 'user-info') {
      nav('/user-info');
    }
    else if(e === 'report') {
      nav('/user-report');
    }
    else if(e === 'word-saved') {
      nav('/word-saved');
    }
    else if(e === 'test-saved') {
      nav('/test-saved');
    }
  }
  console.log("userInfo._id:", userInfo._id); // Add this line to log userInfo._id

  return (
    <>
      <header className=" bg-[#ffffff] w-full px-9 py-5 flex justify-center">
        <div className="max-w-[1440px] w-full flex flex-row justify-between  items-center">
          <Link to='/'>
            <img className='flex justify-center max-w-full object-cover object-center ml-4' src={Logo} alt="BetterTOEIC" />
          </Link>
        <div className="right flex flex-row gap-[32px] items-center justify-center">
          <ul className='flex flex-row gap-[18px]'>
            { userInfo._id && (<li><Link to='/road-map'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Roadmap</Button></Link></li>)}
            <li><Link to='/test'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Tests</Button></Link></li>
            <li><Link to='/practice'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Practices</Button></Link></li>
            <li><Link to='/vocab-gallery'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Vocabulary</Button></Link></li>
            <li><Link to='/forum'><Button className='hover:bg-slate-100' style={{fontWeight: "700", fontSize: "16px", color:'#000000', fontFamily:'Nunito Sans'}} variant='text' sx={{textTransform:'none'}}>Forum</Button></Link></li>
          </ul>
          { userInfo._id && (<div className="icon_noti">
            <button className='flex items-center justify-center'><img src={Noti} alt="" /></button>
          </div>)}
          {
            userInfo._id && (
              <Select onValueChange={handleItemChange}>
                <SelectTrigger value={selectedItem} className="flex flex-row w-auto gap-4 justify-between shadow-none bg-background h-auto py-1 px-2 border-none">
                    <img src={userInfo.avatar} alt="" className="max-h-10 max-w-10 aspect-square w-full h-full inline-block rounded-full object-fill" />
                    <div className="flex flex-col">
                      <span className='text-[16px] font-semibold '>{userInfo.name.split(' ')[0]}</span>
                      <span className='text-[12px] font-normal '>{userInfo.isAdmin == true ? 'User' : 'Admin'}</span>
                    </div>
                </SelectTrigger>
                <SelectContent className='bg-background'>
                  <SelectGroup>
                    <SelectItemWithText value='report'>User report</SelectItemWithText>
                    <SelectItemWithText value='user-info'>User-info</SelectItemWithText>
                    <SelectItemWithText  value='test-saved'>Test saved list</SelectItemWithText>
                    <SelectItemWithText  value='word-saved'>Word saved list</SelectItemWithText>
                    <SelectItemWithText  value='log-out'>Log out</SelectItemWithText>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )
          }
        </div>
        </div>
      </header>
    </>
  );
}
