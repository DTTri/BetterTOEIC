// This is just a stub code (mock code)

import Question from "@/entities/Question";
import { useState } from "react";

export default function QuestionComponent({question} : {question : Question} )  {
  //{strImg = '', questionText, questionNum, options} : {strImg?: string, questionText:string, questionNum: number, options: string[]}
  const [ans, setAns] = useState('');
  return <div className="mb-5">
    <h4 className="text-[18px] w-full font-bold mb-2 text-wrap">Question {question.question_number}: {question.text}</h4>
    <div className="content flex flex-row w-full gap-[32px] items-center">
      {question.image && question.part === 1 && 
      <div className="img w-[40%]">
        <img className="max-w-full w-full max-h-[280px] block object-cover object-center " src={question.image[0]} alt="" />
      </div>}
      <div className="flex flex-col gap-2">
      {question.choices.map((optionValue, index) => (
        <div key={index} className="flex justify-start items-center gap-2">
          <input
            type="radio"
            name={`question-${question.question_number}`}
            id={`optionValue-${question.question_number}-${index}`}
            onChange={(e) => {
              console.log(e.target.value);  
              setAns(() => e.target.value);
            }}
            className="w-[20px] h-[20px] border-solid border-[1px] border-gray-400"
            value={String.fromCharCode(65 + index)}
          />
          <label htmlFor={`optionValue-${question.question_number}-${index}`} className="text-[16px] font-medium text-wrap">
            ({String.fromCharCode(65 + index)}) {optionValue && ':'} {optionValue}
          </label>
        </div>
      ))}
      </div>
    </div>
  </div>;
}
