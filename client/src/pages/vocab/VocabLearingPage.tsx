import { FlashCard, Footer, Header, LeftBar, QuestionPalette } from '@/components'
import Vocab from '@/entities/Vocab';
import VocabByTopic from '@/entities/VocabByTopic';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import vocab_data from '@/data/vocab_data_lists';
import LeftBarVocab from '@/components/vocab/LeftBarVocab';

export default function VocabLearingPage() {
  const location = useLocation();
  const vocabId = location.state?.vocabId || '0';

  const handleVocabSelectedChange = (selectedVocab: number) => {
    setSelectedVocab(selectedVocab);
  };
  const [vocabs, setVocabs] = useState<Vocab[]>(vocab_data[Number.parseInt(vocabId)].vocabs);
  const [selectedVocab, setSelectedVocab] = useState<number>(0);

  console.log(vocabs[selectedVocab]);
  return (
    <div className=''>
        <Header />
        <div className="flex flex-row items-stretch">
            <LeftBarVocab VocabLists={vocab_data}/>
            <div className="w-full flex flex-col gap-4 p-6">
                <FlashCard vocab={vocabs[selectedVocab]}/>
                <QuestionPalette questionNumber={vocabs.length} onQuestionSelectedChange={handleVocabSelectedChange}/>
            </div>
        </div>
    </div>
  )
}
