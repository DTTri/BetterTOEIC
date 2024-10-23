import React, { useState, useEffect } from 'react';

export default function QuestionPalette({ questionNumber, onQuestionSelectedChange }: {questionNumber: number, onQuestionSelectedChange: (selectedQuestion: number) => void}) {
  const [questionSelected, setQuestionSelected] = useState(1);

  useEffect(() => {
    console.log(questionSelected + 'from QuestionPalette');
    onQuestionSelectedChange(questionSelected);
  }, [questionSelected, onQuestionSelectedChange]);

  return (
    <div className='w-full px-8 py-6 bg-[#fff] rounded-2xl '>
      <h3 className='text-2xl font-normal text-[#000] mb-3'>Question Palette</h3>
      <div className="flex flex-row gap-2 scroll-m-2 overflow-auto">
        {Array.from(Array(questionNumber).keys()).map((question, index) => (
          <div
            className='min-w-[32px] min-h-[32px] flex items-center justify-center text-sm bg-[#F6F6F6] rounded-[10px] text-center hover:bg-slate-300 cursor-pointer'
            onClick={() => setQuestionSelected(index + 1)}
            key={index}
            style={{ backgroundColor: questionSelected === index + 1 ? '#3A7EE1' : '#F6F6F6', color: questionSelected === index + 1 ? '#fff' : '#000' }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}