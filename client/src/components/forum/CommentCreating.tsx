import { Button } from '@mui/material'
import { useRef } from 'react';

export default function CommentCreating(
    {
        onCommentCreated
    }
    :
    {
        onCommentCreated: (content: string) => void
    }
) {
    const commentInput = useRef<HTMLInputElement>(null);
    const handleCommentCreate = () => {
        if(commentInput.current?.value === '') {
            alert('Vui lòng nhập nội dung bình luận');
            return;
        }
        if (commentInput.current) {
          onCommentCreated(commentInput.current.value);
          commentInput.current.value = ''; // Clear the input after submitting
        }
      };
    return (
      <div className='shadow-md max-w-[750px] w-full bg-[#fff] py-7 px-10 rounded-[15px]'>
          <div className="content mb-4">
              <input ref={commentInput} name='comment' type="text" className="w-full h-[40px] border border-gray-300 rounded-[3px] px-3" placeholder="Nhập bình luận của bạn"/>
          </div>
          <div className="buttons flex flex-row gap-4 justify-end">
                <Button onClick={handleCommentCreate} variant='contained' style={{ backgroundColor: "#FE5507", color: "#fff"}}>Bình luận</Button>
          </div>
      </div>
    )
}
