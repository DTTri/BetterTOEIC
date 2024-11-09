import { FlashCard, Footer, Header, LeftBar, QuestionPalette } from '@/components'
import Vocab from '@/entities/Vocab';
import VocabByTopic from '@/entities/VocabByTopic';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import vocab_data from '@/data/vocab_data_lists';
import LeftBarVocab from '@/components/vocab/LeftBarVocab';

export default function VocabLearingPage() {
  const { id } = useParams();

  console.log(id)

  const [selectedVocab, setSelectedVocab] = useState<number>(0);
  const [vocabs, setVocabs] = useState<Vocab[]>(vocab_data[0].vocabs);

  useEffect(() => {
    const newVocabs = vocab_data.find((vocab) => vocab._id === id)?.vocabs || [];
    if (newVocabs !== vocabs) {
      setVocabs(newVocabs);
    }
  }, [id, vocabs]);

  const handleVocabSelectedChange = (selectedVocab: number) => {
    setSelectedVocab(selectedVocab);
  };

  console.log(vocabs)

  return (
    <div className=''>
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
