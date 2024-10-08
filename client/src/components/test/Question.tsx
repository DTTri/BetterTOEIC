// This is just a stub code (mock code)

import { useState } from "react";

export default function Question({strImg, questionNum} : {strImg: string, questionNum: number}) {
  const [ans, setAns] = useState('');
  return <div className="w-[900px]">
    <h4 className="text-2xl font-bold mb-2">Question {questionNum}:</h4>
    <div className="content flex flex-row w-full gap-[48px] items-center">
      {strImg !== '' && 
      <div className="img w-[50%]">
        <img className="w-full max-h-[300px] block object-cover object-center " src={strImg} alt="" />
      </div>}
      <form className="questions w-[40%] flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <input className="w-[20px] h-[20px] rounded-[15px] border-solid border-[1px] border-[##767676] mr-3" type="radio" name={questionNum + ''} id="A" />
          <label
            className="text-[20px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            (A)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input name={questionNum + ''} className="w-[20px] h-[20px] rounded-[15px] border-solid border-[1px] border-[##767676] mr-3" type="radio" id="B" />
          <label
            className="text-[20px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            (B)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input name={questionNum + ''} className="w-[20px] h-[20px] rounded-[15px] border-solid border-[1px] border-[##767676] mr-3" type="radio" id="C" />
          <label
            className="text-[20px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            (C)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input name={questionNum + ''} className="w-[20px] h-[20px] rounded-[15px] border-solid border-[1px] border-[##767676] mr-3" type="radio" id="D" />
          <label
            className="text-[20px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            (D)
          </label>
        </div>
      </form>
    </div>
  </div>;
}
