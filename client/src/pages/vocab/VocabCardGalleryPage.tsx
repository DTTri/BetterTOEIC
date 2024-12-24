import { VocabByTopicCard } from "@/components";
import { sVocab } from "@/store";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";


function VocabCardGalleryPage() {
  const vocabs = sVocab.use((cur) => cur.vocabTopics);

  const navigate = useNavigate();
  const handleOnCardClick = (id: string) => {
    navigate(`/vocab-learning/${id}`);
  };
  return (
    <motion.div initial={{ opacity: 0, translateY: -20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 0.25, scale: { type: "spring", visualDuration: 0.4 }, opacity: { ease: "linear" } }}>
      <h2 className="text-5xl text-[#202224] font-bold my-5 text-center">Learn vocab by topic with BetterTOEIC</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 px-10">
        {vocabs.map((vocab) => {
          console.log(vocab._id + "vocab in map");
          return (
            <VocabByTopicCard key={vocab._id} vocabByTopic={vocab} onCardClick={handleOnCardClick} />
          )
        })}
      </div>
    </motion.div>
  );
}

export default VocabCardGalleryPage;
