// This is just a stub code (mock code)

import { useState } from "react";

export default function Question({strImg = '', questionText, questionNum, options} : {strImg: string, questionText:string, questionNum: number, options: string[]}) {
  const [ans, setAns] = useState('');
  return <div className="w-[900px] mb-5">
    <h4 className="text-[20px] font-bold mb-2">Question {questionNum}: {questionText}</h4>
    <div className="content flex flex-row w-full gap-[48px] items-center">
      {strImg !== '' && 
      <div className="img w-[40%]">
        <img className="max-w-full w-full max-h-[250px] block object-cover object-center " src={strImg} alt="" />
      </div>}
      <div className="flex flex-col gap-2 items-center">
      {options.map((optionValue, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            name={`question-${questionNum}`}
            id={`optionValue-${questionNum}-${index}`}
            onChange={(e) => {
              console.log(e.target.value);  
              setAns(() => e.target.value);
            }}
            className="w-[20px] h-[20px] border-solid border-[1px] border-gray-400"
            value={String.fromCharCode(65 + index)}
          />
          <label htmlFor={`optionValue-${questionNum}-${index}`} className="text-[18px] font-medium">
          ({String.fromCharCode(65 + index)}): {optionValue}
          </label>
        </div>
      ))}
      </div>
    </div>
  </div>;
}
