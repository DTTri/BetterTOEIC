import { Footer, Header, VocabByTopicCard } from "@/components";
import React from "react";
import vocab_data from "@/data/vocab_data_lists";
import { useNavigate } from "react-router-dom";

function VocabCardGallery() {
  const navigate = useNavigate();
  const onCardClick = (id: string) => {
    navigate(`/vocab-learning/${id}`);
  };
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-8 ">
        {vocab_data.map((topic) => (
          <VocabByTopicCard vocabByTopic={topic} onCardClick={onCardClick} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default VocabCardGallery;
