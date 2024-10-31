import Comment from '@/components/forum/Comment'
import PostComponent from '@/components/forum/PostComponent'
import PostDetail from '@/components/forum/PostDetail'
import PostSearch from '@/components/forum/PostSearch'
import Post from '@/entities/Post'
import React from 'react'

const posts: Post[] = [
  {
    postID: '1',
    title: 'Tiêu đề bài viết 1',
    content: 'Nội dung bài viết 1',
    image_content: ['https://i.pinimg.com/236x/f8/bf/df/f8bfdfe57efa019245b0952a1a5892f1.jpg', 
      'https://i.pinimg.com/236x/b6/45/5c/b6455cb707578bb278ead89866428047.jpg',
      'https://i.pinimg.com/236x/e7/77/11/e7771177a884b4f30540c5542b919c61.jpg'
    ],
    comments: [
      {
        _id: '11',
        content: 'Nội dung bình luận 1',
        creator: {
          _id: '111',
          username: 'Nguyen Van A',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 10,
        updated_at: '2 hours ago'
      },
      {
        _id: '12',
        content: 'Nội dung bình luận 2',
        creator: {
          _id: '112',
          username: 'Nguyen Van B',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 11,
        updated_at: '2 hours ago'
      }
    ],
    created_at: '2 hours ago',
    creator:{
      _id: '111',
      username: 'Nguyen Van A',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    totalLike: 10,
    updated_at: '2 hours ago',
  },
  {
    postID: '2',
    title: 'Tiêu đề bài viết 2',
    content: 'Nội dung bài viết 2',
    image_content: ['https://i.pinimg.com/236x/f8/bf/df/f8bfdfe57efa019245b0952a1a5892f1.jpg', 
      'https://i.pinimg.com/236x/b6/45/5c/b6455cb707578bb278ead89866428047.jpg',
      'https://i.pinimg.com/236x/e7/77/11/e7771177a884b4f30540c5542b919c61.jpg'
    ],
    comments: [
      {
        _id: '21',
        content: 'Nội dung bình luận 1',
        creator: {
          _id: '111',
          username: 'Nguyen Van A',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 10,
        updated_at: '2 hours ago'
      },
      {
        _id: '22',
        content: 'Nội dung bình luận 2',
        creator: {
          _id: '112',
          username: 'Nguyen Van B',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 11,
        updated_at: '2 hours ago'
      }
    ],
    created_at: '2 hours ago',
    creator:{
      _id: '211',
      username: 'Nguyen Van A',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    totalLike: 10,
    updated_at: '2 hours ago',
  }, 
  {
    postID: '3',
    title: 'Tiêu đề bài viết 3',
    content: 'Nội dung bài viết 3',
    image_content: ['https://i.pinimg.com/236x/f8/bf/df/f8bfdfe57efa019245b0952a1a5892f1.jpg', 
      'https://i.pinimg.com/236x/b6/45/5c/b6455cb707578bb278ead89866428047.jpg',
      'https://i.pinimg.com/236x/e7/77/11/e7771177a884b4f30540c5542b919c61.jpg'
    ],
    comments: [
      {
        _id: '31',
        content: 'Nội dung bình luận 1',
        creator: {
          _id: '111',
          username: 'Nguyen Van A',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 10,
        updated_at: '2 hours ago'
      },
      {
        _id: '32',
        content: 'Nội dung bình luận 2',
        creator: {
          _id: '112',
          username: 'Nguyen Van B',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        created_at: '2 hours ago',
        total_like: 11,
        updated_at: '2 hours ago'
      }
    ],
    created_at: '2 hours ago',
    creator:{
      _id: '311',
      username: 'Nguyen Van A',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    totalLike: 10,
    updated_at: '2 hours ago',
  }
]

export default function ForumPage() {
  return (
    <div className='flex flex-row justify-center items-center w-full'>
      
      <div className="Posts flex flex-col gap-4 w-full justify-center items-center">
        {
          posts.map((post, index) => (
            <PostComponent key={index} post={post}/>
          ))
        }
      </div>
    </div>
  )
}
