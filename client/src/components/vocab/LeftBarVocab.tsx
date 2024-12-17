import VocabByTopic from "@/entities/VocabByTopic";
import { sVocab } from "@/store";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//should be edited when call api from back-end

export default function LeftBarVocab({
  VocabLists,
}: {
  VocabLists: VocabByTopic[];
}) {
  const { id } = useParams();
  const vocabHistory = sVocab
    .use((state) => state.vocabHistory)
    .find((vocabhistory) => vocabhistory.topicId === id);
  useEffect(() => {}, [id]);
  return (
    <div className="max-w-[300px] w-full items-center flex-col bg-[#fff] h-full overflow-y-auto py-5">
      <div className="flex flex-col items-center mx-auto">
        {VocabLists.map((vocab, index) => {
          return (
            <Link
              key={index}
              className="w-[80%] mx-auto mb-4"
              to={`/vocab-learning/${vocab._id}`}
            >
              <div
                className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[10px]"
                style={{
                  backgroundColor: id === vocab._id ? "#94a3b8" : "#fff",
                }}
              >
                <h3 className="text-base font-semibold text-[#202224]">
                  {vocab.name}
                </h3>
                {vocabHistory &&
                  vocabHistory.completedVocabs.length ==
                    vocab.vocabs.length && <DoneIcon className="" />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
