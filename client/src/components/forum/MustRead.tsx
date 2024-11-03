import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';

export default function MustRead() {
  return (
    <div className='w-full bg-[#fff] py-7 px-5 flex flex-col items-center rounded-[15px] gap-6'>
        <div className="w-full ">
            <div className="flex flex-row items-center gap-3 py-2 border-b-[1px] mb-4">
                <StarBorderIcon style={ { width: "25px", height: "25px"}} className='text-[#FFD700]' />
                <h2 className='text-[20px] font-semibold'>Must-read posts</h2>
            </div>
            <div className="flex flex-col gap-2">
                <ul className='px-5 text-[#1682FD] font-semibold text-[16px]' style={ { listStyleType: "disc"}}>
                    <li className='hover:text-[#FE5507]'><Link to={``} >How to create a post</Link></li>
                    <li className='hover:text-[#FE5507]'><Link to={``} >How to report a improper post</Link></li>
                </ul>
            </div>
        </div>
        <div className="w-full ">
            <div className="flex flex-row items-center gap-3 py-2 border-b-[1px] mb-4">
                <LinkIcon style={ { width: "25px", height: "25px"}} className='text-[#FFD700]' />
                <h2 className='text-[20px] font-semibold'>Feature links</h2>
            </div>
            <div className="flex flex-col gap-2">
                <ul className='px-5 text-[#1682FD] font-semibold text-[16px]' style={ { listStyleType: "disc"}}>
                    <li className='hover:text-[#FE5507]'><Link to={``} >New review TOEIC test</Link></li>
                    <li className='hover:text-[#FE5507]'><Link to={``} >How to report a improper post</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
