import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function PostSharing() {
    return (
      <div className='shadow-md max-w-[750px] w-full bg-[#fff] py-6 px-7 rounded-[15px]'>
          <div className="relative first w-full flex flex-row items-center">
              <Avatar style={{ width: '45px', height: '45px'}} alt='avatar' src='https://www.w3schools.com/howto/img_avatar.png' />
              <div className="flex-1 px-5 py-2 bg-[#f3f2f2] rounded-2xl mx-4">
                  <span className='text-[16px] text-[#20222480] select-none'>Bạn có điều gì muốn chia sẻ không?</span>
              </div>
              <Link to={'create-post'}>
              <Button variant='contained' className='text-[#fff]' style={{backgroundColor: "#FE5507", borderRadius: '6px'}}>Tạo bài viết</Button></Link>
          </div>
      </div>
    )
  }
