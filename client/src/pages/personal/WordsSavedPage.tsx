import WordSaved from "@/components/personal/WordSaved";
import LeftBarPersonal from "@/components/personal/LeftBarPersonal";
import { SearchBar } from "@/components";
import { sVocab } from "@/store";
import { useEffect, useState } from "react";
import LoadingProgress from "@/components/LoadingProgress";

export default function WordSavedPage() {
  const savedVocabs = sVocab.use((v) => v.vocabsSaved);
  const [curSavedVocabs, setCurSavedVocabs] = useState(savedVocabs);
  if(!savedVocabs){
    return <LoadingProgress />
  }

  useEffect(() => {
    setCurSavedVocabs(savedVocabs);
  }, [savedVocabs]);
  const handleOnSearch = (searchText: string) => {
    setCurSavedVocabs(savedVocabs.filter((vocab) => vocab.word.includes(searchText)));
  }

  return (
    <div className="">
      <div className="w-full flex flex-row gap-8 items-stretch">
        <LeftBarPersonal />
        <div className="flex flex-col w-full px-12 py-7 gap-5 items-center">
          <SearchBar onSearch={handleOnSearch}/>
          <div className="w-full flex flex-col gap-10 py-8 px-8 rounded-[15px] bg-[#fff]">
            {curSavedVocabs.map((vocab) => (
              <WordSaved key={vocab._id} vocab={vocab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
