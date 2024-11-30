import { VocabByTopicCard } from "@/components";
import { sVocab } from "@/store";
import { useNavigate } from "react-router-dom";

function VocabCardGalleryPage() {
  const vocabs = sVocab.use((cur) => cur.vocabTopics);

  const navigate = useNavigate();
  const handleOnCardClick = (id: string) => {
    navigate(`/vocab-learning/${id}`);
  };
  return (
    <div>
      <h2 className="text-5xl text-[#202224] font-bold my-5 text-center">Học từ vựng theo chủ đề cùng BetterTOEIC</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 px-10">
        {vocabs.map((vocab) => {
          console.log(vocab._id + "vocab in map");
          return (
            <VocabByTopicCard key={vocab._id} vocabByTopic={vocab} onCardClick={handleOnCardClick} />
          )
        })}
      </div>
    </div>
  );
}

export default VocabCardGalleryPage;
