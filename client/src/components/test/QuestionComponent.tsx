// This is just a stub code (mock code)

import Question from "@/entities/Question";

export default function QuestionComponent({
  question,
  ans,
  onChoose,
}: {
  question: Question;
  ans: number[];
  onChoose: (choice: number, question_number: number) => void;
}) {
  //{strImg = '', questionText, questionNum, options} : {strImg?: string, questionText:string, questionNum: number, options: string[]}
  return (
    <div className="mb-4">
      <h4 className="text-[18px] w-full font-bold mb-2 text-wrap">
        Question {question.question_number}: {question.text}
      </h4>
      <div className="content flex flex-row w-full gap-[24px] items-center">
        {question.images && question.part === 1 && (
          <div className="img w-[50%]">
            <img
              className="max-w-full w-full max-h-[400px] block object-contain object-center "
              src={question.images[0]}
              alt=""
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {question.choices.map((optionValue, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <input
                type="radio"
                name={`question-${question.question_number}`}
                id={`optionValue-${question.question_number}-${index}`}
                onChange={(e) => {
                  //because array index is 0-based, but the question number 1-based, so we set question number -1
                  onChoose(index + 1, question.question_number - 1);
                }}
                className="w-[20px] h-[20px] border-solid border-[1px] border-gray-400"
                value={index}
                checked={ans[question.question_number - 1] === index + 1}
              />
              <label
                htmlFor={`optionValue-${question.question_number}-${index}`}
                className="text-[16px] font-medium text-wrap"
              >
                ({String.fromCharCode(65 + index)}) {optionValue && ":"}{" "}
                {optionValue}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
