import { Button } from '@mui/material'

export default function CommentCreating() {
    return (
      <div className='shadow-md max-w-[700px] w-full bg-[#fff] py-7 px-10 rounded-[15px]'>
          <div className="content mb-4">
              <input name='comment' type="text" className="w-full h-[40px] border border-gray-300 rounded-[3px] px-3" placeholder="Nhập bình luận của bạn"/>
          </div>
          <div className="buttons flex flex-row gap-4 justify-end">
                <Button variant='contained' style={{ backgroundColor: "#EAEAEA", color: "#808080"}}>Hủy</Button>
                <Button variant='contained' style={{ backgroundColor: "#FE5507", color: "#fff"}}>Bình luận</Button>
          </div>
      </div>
    )
}
