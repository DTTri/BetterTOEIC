import { SavedVocab } from "@/entities";
import SaveVocabDTO from "@/entities/DTOS/SaveVocabDTO";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WordSaved({
  vocab,
  handleUnSaveVocab,
  }
    : 
  {
    vocab: SavedVocab;
    handleUnSaveVocab: (vocab: SaveVocabDTO) => void;
  })
{
  return (
    <div className="w-full px-8 py-3 bg-[#D9E7FF] rounded-[30px] flex flex-col gap-[10px]">
      <div className="flex flex-row items-center gap-4">
        <p className="text-base font-bold text-[#000] ">{vocab.word}</p>
        <hr className="w-[1px] h-6 bg-black" />
        <p className="text-base font-medium text-[#000]">.{vocab.type}</p>
        <hr className="w-[1px] h-6 bg-black" />
        <p className="text-base font-normal text-[rgba(32, 34, 36, 0.5)] ">
          {vocab.spelling}
        </p>
        <hr className="w-[1px] h-6 bg-black" />
        <p className="text-base font-normal text-[#202224] ">
          {vocab.meaning_vi}
        </p>
        <div className="flex-1 justify-end flex flex-row">
          <DeleteIcon onClick={() => {
            handleUnSaveVocab({
              ...vocab,
              isSaving: false,
            });
          }} className=" max-w-5 h-5 cursor-pointer hover:bg-slate-300 rounded-full " />
        </div>
      </div>
      <div className="w-full">
        <p className="text-base font-normal text-[#202224] text-wrap">
          {vocab.meaning_en}
        </p>
      </div>
      <div className="w-full">
        <p className="text-base font-normal text-[rgba(32, 34, 36, 0.80)] text-wrap">
          Ex: {vocab.example}
        </p>
      </div>
    </div>
  );
}
