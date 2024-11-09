import { Footer, Header } from '@/components'
import { useState } from 'react'
import PracticeList from '@/components/practice/PracticeList'
import { practiceForPart1, practiceForPart2, practiceForPart3, practiceForPart4, practiceForPart5 } from '@/data/practice_test'
import practiceResult from '@/data/practice_result'
import Practice from '@/entities/Practice'
import { PracticePart } from '@/entities/PracticeHisotry'

export default function PracticePage() {
  const [PracticeListsForPart1, setPracticeListsForPart1] = useState<Practice[]>(practiceForPart1);
  const [PracticeListsForPart2, setPracticeListsForPart2] = useState<Practice[]>(practiceForPart2);
  const [PracticeListsForPart3, setPracticeListsForPart3] = useState<Practice[]>(practiceForPart3);
  const [PracticeListsForPart4, setPracticeListsForPart4] = useState<Practice[]>(practiceForPart4);
  const [PracticeListsForPart5, setPracticeListsForPart5] = useState<Practice[]>(practiceForPart5);
  return (
    <div>
        <div className="content">
            <h1 className='text-[52px] text-center text-[#202224] mt-8 font-bold'>Luyện tập cùng BetterTOEIC</h1>
            <div className="flex flex-col items-center gap-5 py-8">
                <PracticeList part={1} title='Photos' practices={PracticeListsForPart1} PracticePart={practiceResult.part[0]}/>
                <PracticeList part={2} title='Question - Response' practices={PracticeListsForPart2} PracticePart={practiceResult.part[1]}/>
                <PracticeList part={3} title='Conversations' practices={PracticeListsForPart3} PracticePart={practiceResult.part[2]}/>
                <PracticeList part={4} title='Short Talks' practices={PracticeListsForPart4} PracticePart={practiceResult.part[3]}/>
                <PracticeList part={5} title='Incomplete Sentences' practices={PracticeListsForPart5} PracticePart={practiceResult.part[4]}/>
            </div>
        </div>
    </div>
  )
}
