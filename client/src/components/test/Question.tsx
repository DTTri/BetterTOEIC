// This is just a stub code (mock code)

import { useState } from "react";

export default function Question({strImg, questionText, questionNum, options} : {strImg: string, questionText:string, questionNum: number, options: string[]}) {
  const [ans, setAns] = useState('');
  return <div className="w-[900px] mb-4">
    <h4 className="text-[20px] font-bold mb-2">Question {questionNum}: {questionText}</h4>
    <div className="content flex flex-row w-full gap-[48px] items-center">
      {strImg !== '' && 
      <div className="img w-[45%]">
        <img className="w-full max-h-[250px] block object-cover object-center " src={strImg} alt="" />
      </div>}
      <div className="flex flex-col gap-2 items-center">
      {options.map((optionValue, index) => (
        <div key={index} className="flex  items-center space-x-2">
          <input
            type="radio"
            name={`question-${questionNum}`}
            id={`optionValue-${questionNum}-${index}`}
            onChange={() => setAns(optionValue)}
            className="w-[18px] h-[18px] border-solid border-[1px] border-gray-400"
          />
          <label htmlFor={`optionValue-${questionNum}-${index}`} className="text-[16px] font-normal">
          ({String.fromCharCode(65 + index)}): {optionValue}
          </label>
        </div>
      ))}
      </div>
    </div>
  </div>;
}
