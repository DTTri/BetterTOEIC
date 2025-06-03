import WordSaved from "@/components/personal/WordSaved";
import LeftBarPersonal from "@/components/personal/LeftBarPersonal";
import { SearchBar } from "@/components";
import { sUser, sVocab } from "@/store";
import { useEffect, useState } from "react";
import LoadingProgress from "@/components/LoadingProgress";
import SaveVocabDTO from "@/entities/DTOS/SaveVocabDTO";
import { toast } from "react-toastify";
import vocabService from "@/services/vocabService";

export default function WordSavedPage() {
  const savedVocabs = sVocab.use((v) => v.vocabsSaved);
  const [curSavedVocabs, setCurSavedVocabs] = useState(savedVocabs);
  const userInfo = sUser.use((state) => state.info);
  if(!savedVocabs || !userInfo) {
    return <LoadingProgress />
  }

  useEffect(() => {
    setCurSavedVocabs(savedVocabs);
  }, [savedVocabs]);
  const handleOnSearch = (searchText: string) => {
    setCurSavedVocabs(savedVocabs.filter((vocab) => vocab.word.includes(searchText)));
  }

  const handleUnSaveVocab = async (vocab: SaveVocabDTO) => {
    try {
      const res = await vocabService.saveVocab(userInfo._id , vocab);
      if(res.EC === 0) {
        toast.success("Unsave vocab successfully");
        const newSavedVocabs = curSavedVocabs.filter((v) => v._id !== vocab._id);
        setCurSavedVocabs(newSavedVocabs);
      }
      else {
        toast.error("Unsave vocab failed" + res.EM);
      }
    } catch (error) {
      toast.error("Error when unsave vocab: " + error);
      
    }
  }

  return (
    <div className="">
      <div className="w-full flex flex-row gap-8 items-stretch">
        <LeftBarPersonal />
        <div className="flex flex-col w-full px-12 py-7 gap-5 items-center">
          <SearchBar onSearch={handleOnSearch}/>
          <div className="w-full flex flex-col gap-10 py-8 px-8 rounded-[15px] bg-[#fff]">
            {curSavedVocabs.map((vocab) => (
              <WordSaved handleUnSaveVocab={handleUnSaveVocab} key={vocab._id} vocab={vocab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
