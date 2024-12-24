import { LeftBar } from '@/components';
import LoadingProgress from '@/components/LoadingProgress';
import { practiceStore } from '@/store/practiceStore'
import { useParams } from 'react-router-dom';

export default function LearnPracticeLesson() {
  const { part, id } = useParams();
  const curPracticeLesson = practiceStore.use(state => state.practiceLesson).find(lesson => lesson._id === id);

  if(!curPracticeLesson || !id || !part) {
    return <LoadingProgress />  
  }

  return (
    <div className="">
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-6 w-full min-h-screen flex flex-col gap-2">
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-center">{curPracticeLesson.title}</h3>
              <div className="text-lg" dangerouslySetInnerHTML={{ __html: curPracticeLesson.content }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
