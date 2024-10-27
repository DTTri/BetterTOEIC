import { FlashCard, Footer, Header, LeftBar, QuestionPalette } from '@/components'
import Vocab from '@/entities/Vocab';
import VocabByTopic from '@/entities/VocabByTopic';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import vocab_data from '@/data/vocab_data_lists';
import LeftBarVocab from '@/components/vocab/LeftBarVocab';

export default function VocabLearingPage() {
  const navigate = useNavigate();
  const { vocabId } = useParams();

  const [vocabs, setVocabs] = useState<Vocab[]>(
    vocab_data[0].vocabs
  );

  const handleVocabTopicChange = (vocabIdChange: string) => {
    if(vocabIdChange !== vocabId) {
      navigate(`/vocab-learning/${vocabIdChange}`);
      setVocabs(vocab_data.find((vocab) => vocab._id === vocabIdChange)?.vocabs || []);
    }
  };

  const handleVocabSelectedChange = (selectedVocab: number) => {
    setSelectedVocab(selectedVocab);
  };
  const [selectedVocab, setSelectedVocab] = useState<number>(0);

  return (
    <div className=''>
        <Header />
        <div className="flex flex-row items-stretch">
            <LeftBarVocab onHandleVocabTopicChange={handleVocabTopicChange} VocabLists={vocab_data}/>
            <div className="w-full flex flex-col gap-4 p-6">
                <FlashCard vocab={vocabs[selectedVocab]}/>
                <QuestionPalette questionNumber={vocabs.length} onQuestionSelectedChange={handleVocabSelectedChange}/>
            </div>
        </div>
    </div>
  )
}
