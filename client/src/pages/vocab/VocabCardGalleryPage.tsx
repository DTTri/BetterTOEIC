import { Footer, Header, VocabByTopicCard } from "@/components";
import React from "react";
import vocab_data from "@/data/vocab_data_lists";
import { useNavigate } from "react-router-dom";

function VocabCardGalleryPage() {
  const navigate = useNavigate();
  const onCardClick = (id: string) => {
    navigate(`/vocab-learning/${id}`);
  };
  return (
    <div>
      <Header />
      <h2 className="text-5xl text-[#202224] font-bold my-5 text-center">Học từ vựng theo chủ đề cùng BetterTOEIC</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 px-10">
        {vocab_data.map((topic) => (
          <VocabByTopicCard vocabByTopic={topic} onCardClick={onCardClick} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default VocabCardGalleryPage;
