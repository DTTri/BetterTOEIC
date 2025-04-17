import Message, { Role } from "@/entities/Message";

const ChatData: Message[] = [
    {
      "role": Role.User,
      "content": "Hello, how can I improve my TOEIC score?",
      "images": ['https://images.unsplash.com/photo-1741964969909-0fa5a7e18201?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D'
      ],
      "created_At": "2025-03-22T10:00:00Z"
    },
    {
      "role": Role.Bot,
      "content": "Hi! To improve your TOEIC score, you should practice regularly and focus on your weak areas.",
      "created_At": "2025-03-22T10:00:05Z"
    },
    {
      "role": Role.User,
      "content": "What are some good resources for TOEIC practice?",
      "created_At": "2025-03-22T10:01:00Z"
    },
    {
      "role": Role.Bot,
      "content": "You can use official TOEIC practice tests, online courses, and TOEIC preparation books.",
      "created_At": "2025-03-22T10:01:10Z"
    },
    {
      "role": Role.User,
      "content": "How often should I take practice tests?",
      "created_At": "2025-03-22T10:02:00Z"
    },
    {
      "role": Role.Bot,
      "content": "It's recommended to take practice tests at least once a week to track your progress.",
      "created_At": "2025-03-22T10:02:10Z"
    },
    {
      "role": Role.User,
      "content": "What should I do if I find the listening section difficult?",
      "created_At": "2025-03-22T10:03:00Z"
    },
    {
      "role": Role.Bot,
      "content": "For the listening section, practice listening to English audio materials like podcasts, news, and movies.",
      "created_At": "2025-03-22T10:03:10Z"
    },
    {
      "role": Role.User,
      "content": "Any tips for the reading section?",
      "created_At": "2025-03-22T10:04:00Z"
    },
    {
      "role": Role.Bot,
      "content": "For the reading section, practice reading English articles and books, and focus on improving your vocabulary.",
      "created_At": "2025-03-22T10:04:10Z",
      images: ['https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D']
    }
  ]

  export default ChatData;