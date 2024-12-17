import { Vocab } from "@/entities";

export default function VocabQuestionPalette({
  numberOfQuestions,
  onQuestionSelectedChange,
  completedVocabs,
  vocabs,
  curQuestionNumber,
}: {
  numberOfQuestions: number;
  onQuestionSelectedChange: (selectedQuestion: number) => void;
  completedVocabs: string[];
  vocabs: Vocab[];
  curQuestionNumber: number;
}) {
  return (
    <div className="w-full px-8 py-3 bg-[#fff] rounded-2xl ">
      <h3 className="text-2xl font-normal text-[#000] mb-2">
        Question Palette
      </h3>
      <div className="flex flex-row gap-2 scroll-m-2 overflow-auto mb-2">
        {Array.from(Array(numberOfQuestions).keys()).map((question, index) => (
          <div
            className="min-w-[32px] min-h-[32px] flex items-center justify-center text-sm bg-[#F6F6F6] rounded-[10px] text-center hover:bg-slate-300 cursor-pointer"
            onClick={() => onQuestionSelectedChange(index)}
            key={index}
            style={{
              backgroundColor:
                completedVocabs.includes(vocabs[index]._id) ? "#FF0000" :  curQuestionNumber === index ? "#3A7EE1" : "#F6F6F6",
              color: completedVocabs.includes(vocabs[index]._id)  ? "#fff" :  curQuestionNumber === index ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
