import { useState } from 'react';
import Question from './Question';

// Part 6 & 7 Component with Paragraph and Image Handling
export default function Part7QuestionGroup({ paragraphs, questions, strImg }:
   { paragraphs: string[], questions: { questionNum: number, questionText: string, options: string[] }[], strImg?: string }) {
  return (
    <div className="max-w-[950px] flex flex-row gap-[48px]">
      {/* Left section: Paragraph or Image */}
      <div className="left-section w-[50%]">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="border-slate-500 shadow wtext-[16px] font-normal text-wrap  mb-3">
            {para}
          </p>
        ))}
        {strImg && (
          <div className="img mb-4">
            <img className="w-[350px] h-full max-h-[300px] object-cover" src={strImg} alt="Question Illustration" />
          </div>
        )}
      </div>

      {/* Right section: Questions */}
      <div className="right-section w-[45%]">
        {questions.map((question, idx) => (
          <Question strImg='' questionText={question.questionText} key={idx} questionNum={question.questionNum} options={question.options} />
        ))}
      </div>
    </div>
  );
}
